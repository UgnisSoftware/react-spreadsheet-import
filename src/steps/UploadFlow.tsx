import { useState } from "react"
import { Progress, useToast } from "@chakra-ui/react"
import type XLSX from "xlsx"
import { UploadStep } from "./UploadStep/UploadStep"
import { SelectHeaderStep } from "./SelectHeaderStep/SelectHeaderStep"
import { SelectSheetStep } from "./SelectSheetStep/SelectSheetStep"
import { mapWorkbook } from "../utils/mapWorkbook"
import { ValidationStep } from "./ValidationStep/ValidationStep"
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
  nextStep: () => void
}

export const UploadFlow = ({ nextStep }: Props) => {
  const { initialStepState } = useRsi()
  const [state, setState] = useState<StepState>(initialStepState || { type: StepType.upload })
  const { maxRecords, translations, uploadStepHook, selectHeaderStepHook, matchColumnsStepHook } = useRsi()
  const toast = useToast()

  switch (state.type) {
    case StepType.upload:
      return (
        <UploadStep
          onContinue={async (workbook) => {
            const isSingleSheet = workbook.SheetNames.length === 1
            if (isSingleSheet) {
              if (maxRecords && exceedsMaxRecords(workbook.Sheets[workbook.SheetNames[0]], maxRecords)) {
                toast({
                  status: "error",
                  variant: "left-accent",
                  position: "bottom-left",
                  title: `${translations.uploadStep.maxRecordsExceeded(maxRecords.toString())}`,
                  isClosable: true,
                })
                return
              }
              const mappedWorkbook = await uploadStepHook(mapWorkbook(workbook))
              setState({
                type: StepType.selectHeader,
                data: mappedWorkbook,
              })
              nextStep()
            } else {
              setState({ type: StepType.selectSheet, workbook })
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
              toast({
                status: "error",
                variant: "left-accent",
                position: "bottom-left",
                title: `${translations.uploadStep.maxRecordsExceeded(maxRecords.toString())}`,
                isClosable: true,
              })
              return
            }
            const mappedWorkbook = await uploadStepHook(mapWorkbook(state.workbook, sheetName))
            setState({
              type: StepType.selectHeader,
              data: mappedWorkbook,
            })
            nextStep()
          }}
        />
      )
    case StepType.selectHeader:
      return (
        <SelectHeaderStep
          data={state.data}
          onContinue={async (...args) => {
            const { data, headerValues } = await selectHeaderStepHook(...args)
            setState({
              type: StepType.matchColumns,
              data,
              headerValues,
            })
            nextStep()
          }}
        />
      )
    case StepType.matchColumns:
      return (
        <MatchColumnsStep
          data={state.data}
          headerValues={state.headerValues}
          onContinue={async (values, rawData, columns) => {
            const data = await matchColumnsStepHook(values, rawData, columns)
            setState({
              type: StepType.validateData,
              data,
            })
            nextStep()
          }}
        />
      )
    case StepType.validateData:
      return <ValidationStep initialData={state.data} />
    default:
      return <Progress isIndeterminate />
  }
}
