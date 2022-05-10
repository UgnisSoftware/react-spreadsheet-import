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

enum Type {
  upload,
  selectSheet,
  selectHeader,
  matchColumns,
  validateData,
}

type State =
  | {
      type: Type.upload
    }
  | {
      type: Type.selectSheet
      workbook: XLSX.WorkBook
    }
  | {
      type: Type.selectHeader
      data: RawData[]
    }
  | {
      type: Type.matchColumns
      data: RawData[]
      headerValues: RawData
    }
  | {
      type: Type.validateData
      data: any[]
    }

interface Props {
  nextStep: () => void
}

export const UploadFlow = ({ nextStep }: Props) => {
  const [state, setState] = useState<State>({ type: Type.upload })
  const { maxRecords, translations, uploadStepHook, selectHeaderStepHook, matchColumnsStepHook } = useRsi()
  const toast = useToast()

  switch (state.type) {
    case Type.upload:
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
                type: Type.selectHeader,
                data: mappedWorkbook,
              })
              nextStep()
            } else {
              setState({ type: Type.selectSheet, workbook })
            }
          }}
        />
      )
    case Type.selectSheet:
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
              type: Type.selectHeader,
              data: mappedWorkbook,
            })
            nextStep()
          }}
        />
      )
    case Type.selectHeader:
      return (
        <SelectHeaderStep
          data={state.data}
          onContinue={async (...args) => {
            const { data, headerValues } = await selectHeaderStepHook(...args)
            setState({
              type: Type.matchColumns,
              data,
              headerValues,
            })
            nextStep()
          }}
        />
      )
    case Type.matchColumns:
      return (
        <MatchColumnsStep
          data={state.data}
          headerValues={state.headerValues}
          onContinue={async (values) => {
            const data = await matchColumnsStepHook(values)
            setState({
              type: Type.validateData,
              data,
            })
            nextStep()
          }}
        />
      )
    case Type.validateData:
      return <ValidationStep initialData={state.data} />
    default:
      return <Progress isIndeterminate />
  }
}
