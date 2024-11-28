import { useCallback, useState } from "react"
import { Progress, useToast } from "@chakra-ui/react"
import type XLSX from "xlsx-ugnis"
import { UploadStep } from "./UploadStep/UploadStep"
import { SelectHeaderStep } from "./SelectHeaderStep/SelectHeaderStep"
import { SelectSheetStep } from "./SelectSheetStep/SelectSheetStep"
import { mapWorkbook } from "../utils/mapWorkbook"
import { ValidationStep } from "./ValidationStep/ValidationStep"
import { addErrorsAndRunHooks } from "./ValidationStep/utils/dataMutations"
import { MatchColumnsStep } from "./MatchColumnsStep/MatchColumnsStep"
import { exceedsMaxRecords } from "../utils/exceedsMaxRecords"
import { useRsi } from "../hooks/useRsi"
import type { RawData } from "../types"

export enum StepType {
  upload = "upload",
  selectSheet = "selectSheet",
  selectHeader = "selectHeader",
  matchColumns = "matchColumns",
  validateData = "validateData",
}
export type StepState =
  | {
      type: StepType.upload
    }
  | {
      type: StepType.selectSheet
      workbook: XLSX.WorkBook
    }
  | {
      type: StepType.selectHeader
      data: RawData[]
    }
  | {
      type: StepType.matchColumns
      data: RawData[]
      headerValues: RawData
    }
  | {
      type: StepType.validateData
      data: any[]
    }

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
    runTableHookThreshold,
  } = useRsi()
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const toast = useToast()
  const errorToast = useCallback(
    (description: string) => {
      toast({
        status: "error",
        variant: "left-accent",
        position: "bottom-left",
        title: `${translations.alerts.toast.error}`,
        description,
        isClosable: true,
      })
    },
    [toast, translations],
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
              const dataWithMeta = await addErrorsAndRunHooks(data, fields, rowHook, tableHook, runTableHookThreshold)
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
    default:
      return <Progress isIndeterminate />
  }
}
