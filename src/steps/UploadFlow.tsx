import { useRSIContext } from "@/contexts/RSIContext"
import { type StepState, StepType } from "./types"
import { useCallback, useState } from "react"
import { toaster } from "@/components/ui/toaster"
import { UploadStep } from "@/steps/UploadStep/UploadStep"
import { exceedsMaxRecords } from "@/utils/exceedsMaxRecords"
import { mapWorkbook } from "@/utils/mapWorkbook"
import { SelectSheetStep } from "@/steps/SelectSheetStep/SelectSheetStep"
import { SelectHeaderStep } from "@/steps/SelectHeaderStep/SelectHeaderStep"
import { MatchColumnsStep } from "@/steps/MatchColumnsStep/MatchColumnsStep"
import { addErrorsAndRunHooks } from "@/steps/ValidationStep/utils/dataMutations"
import { ValidationStep } from "@/steps/ValidationStep/ValidationStep"

interface Props {
  state: StepState
  onNext: (v: StepState) => void
  onBack?: () => void
}

export const UploadFlow = ({ state, onNext, onBack }: Props) => {
  const {
    maxRecords,
    translations,
    uploadStepHook,
    selectHeaderStepHook,
    matchColumnsStepHook,
    fields,
    rowHook,
    tableHook,
  } = useRSIContext()
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const errorToast = useCallback(
    (description: string) => {
      toaster.create({
        type: "error",
        title: translations.alerts.toast.error,
        description,
        closable: true,
      })
    },
    [translations],
  )

  switch (state.type) {
    case StepType.upload:
      return (
        <UploadStep
          onContinue={async (workbook, file) => {
            setUploadedFile(file)
            const isSingleSheet = workbook.SheetNames.length === 1
            if (isSingleSheet) {
              if (maxRecords && exceedsMaxRecords(workbook.Sheets[workbook.SheetNames[0]], maxRecords)) {
                errorToast(translations.uploadStep.maxRecordsExceeded(maxRecords.toString()))
                return
              }
              try {
                const mappedWorkbook = await uploadStepHook(mapWorkbook(workbook))
                onNext({
                  type: StepType.selectHeader,
                  data: mappedWorkbook,
                })
              } catch (e) {
                errorToast((e as Error).message)
              }
            } else {
              onNext({ type: StepType.selectSheet, workbook })
            }
          }}
        />
      )
    case StepType.selectSheet:
      return (
        <SelectSheetStep
          sheetNames={state.workbook.SheetNames}
          onContinue={async (sheetName) => {
            if (maxRecords && exceedsMaxRecords(state.workbook.Sheets[sheetName], maxRecords)) {
              errorToast(translations.uploadStep.maxRecordsExceeded(maxRecords.toString()))
              return
            }
            try {
              const mappedWorkbook = await uploadStepHook(mapWorkbook(state.workbook, sheetName))
              onNext({
                type: StepType.selectHeader,
                data: mappedWorkbook,
              })
            } catch (e) {
              errorToast((e as Error).message)
            }
          }}
          onBack={onBack}
        />
      )
    case StepType.selectHeader:
      return (
        <SelectHeaderStep
          data={state.data}
          onContinue={async (...args) => {
            try {
              const { data, headerValues } = await selectHeaderStepHook(...args)
              onNext({
                type: StepType.matchColumns,
                data,
                headerValues,
              })
            } catch (e) {
              errorToast((e as Error).message)
            }
          }}
          onBack={onBack}
        />
      )
    case StepType.matchColumns:
      return (
        <MatchColumnsStep
          data={state.data}
          headerValues={state.headerValues}
          onContinue={async (values, rawData, columns) => {
            try {
              const data = await matchColumnsStepHook(values, rawData, columns)
              const dataWithMeta = await addErrorsAndRunHooks(data, fields, rowHook, tableHook)
              onNext({
                type: StepType.validateData,
                data: dataWithMeta,
              })
            } catch (e) {
              errorToast((e as Error).message)
            }
          }}
          onBack={onBack}
        />
      )
    case StepType.validateData:
      return <ValidationStep initialData={state.data} file={uploadedFile!} onBack={onBack} />
  }
}
