import React, { useState } from "react"
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
      data: string[][]
    }
  | {
      type: Type.matchColumns
      data: string[][]
      headerValues: string[]
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
  const { maxRecords, translations } = useRsi()
  const toast = useToast()

  switch (state.type) {
    case Type.upload:
      return (
        <UploadStep
          onContinue={(workbook) => {
            if (workbook.SheetNames.length === 1) {
              if (maxRecords && exceedsMaxRecords(workbook.Sheets[workbook.SheetNames[0]], maxRecords)) {
                return toast({
                  status: "error",
                  variant: "left-accent",
                  position: "bottom-left",
                  title: `${translations.uploadStep.maxRecordsExceeded(maxRecords.toString())}`,
                })
              }
              setState({ type: Type.selectHeader, data: mapWorkbook(workbook) })
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
          onContinue={(sheetName) => {
            if (maxRecords && exceedsMaxRecords(state.workbook.Sheets[sheetName], maxRecords)) {
              return toast({
                status: "error",
                variant: "left-accent",
                position: "bottom-left",
                title: `${translations.uploadStep.maxRecordsExceeded(maxRecords.toString())}`,
              })
            }
            setState({ type: Type.selectHeader, data: mapWorkbook(state.workbook, sheetName) })
            nextStep()
          }}
        />
      )
    case Type.selectHeader:
      return (
        <SelectHeaderStep
          data={state.data}
          onContinue={(headerValues, data) => {
            setState({
              type: Type.matchColumns,
              headerValues,
              data,
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
          onContinue={(data) => {
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
