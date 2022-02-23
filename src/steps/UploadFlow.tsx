import React, { useState } from "react"
import { Progress } from "@chakra-ui/react"
import type XLSX from "xlsx"
import { UploadStep } from "./UploadStep/UploadStep"
import { SelectHeaderStep } from "./SelectHeaderStep/SelectHeaderStep"
import { SelectSheetStep } from "./SelectSheetStep/SelectSheetStep"
import { mapWorkbook } from "../utils/mapWorkbook"

enum Type {
  upload,
  selectSheet,
  selectHeader,
  loadMatchColumns,
  loadMatchColumnsError,
  matchColumns,
  submitMatchColumns,
  submitMatchColumnsError,
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
      type: Type.loadMatchColumns
      data: string[][]
      headerValues: string[]
    }
  | {
      type: Type.loadMatchColumnsError
      data: string[][]
      headerValues: string[]
      error: string
    }
  | {
      type: Type.matchColumns
      data: string[][]
      headerValues: string[]
      table: object[]
      values: object
    }
  | {
      type: Type.submitMatchColumns
      data: string[][]
      headerValues: string[]
      table: object[]
      values: object
    }
  | {
      type: Type.submitMatchColumnsError
      data: string[][]
      headerValues: string[]
      table: object[]
      values: object
      error: string
    }

interface Props {
  nextStep: () => void
}

export const UploadFlow = ({ nextStep }: Props) => {
  const [state, setState] = useState<State>({ type: Type.upload })

  switch (state.type) {
    case Type.upload:
      return (
        <UploadStep
          onContinue={(workbook) => {
            if (workbook.SheetNames.length === 1) {
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
            setState({ type: Type.selectHeader, data: mapWorkbook(state.workbook, sheetName) })
            nextStep()
          }}
        />
      )
    case Type.selectHeader:
      return (
        <SelectHeaderStep
          data={state.data}
          onContinue={(headerValues: string[], data: string[][]) => {
            setState({
              type: Type.loadMatchColumns,
              headerValues,
              data,
            })
          }}
          onCancel={() => {
            setState({ type: Type.upload })
          }}
        />
      )
    case Type.matchColumns:
    case Type.submitMatchColumns:
    case Type.loadMatchColumns:
      return <Progress isIndeterminate />
    default:
      return null
  }
}
