import React, { useState } from "react"
import { Progress } from "@chakra-ui/react"
import type XLSX from "xlsx"
import { Upload } from "./Upload"
import { SelectHeader } from "./SelectHeader"
import { MatchColumns } from "./MatchColumns"
import { SelectSheet } from "./SelectSheet"
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
  config?: any
}

export const UploadFlow = ({ config }: Props) => {
  const [state, setState] = useState<State>({ type: Type.upload })

  switch (state.type) {
    case Type.upload:
      return (
        <Upload
          onContinue={(data) => {
            setState({ type: Type.selectHeader, data: mapWorkbook(data) })
          }}
          onMultiSheetContinue={(workbook) => {
            setState({ type: Type.selectSheet, workbook })
          }}
        />
      )
    case Type.selectSheet:
      return (
        <SelectSheet
          sheetNames={state.workbook.SheetNames}
          onContinue={(sheetName) => {
            setState({ type: Type.selectHeader, data: mapWorkbook(state.workbook, sheetName) })
          }}
        />
      )
    case Type.selectHeader:
      return (
        <SelectHeader
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
    case Type.submitMatchColumnsError:
      return (
        <MatchColumns
          headerValues={state.headerValues}
          onCancel={() => {
            setState({ type: Type.upload })
          }}
          values={state.values}
          table={state.table}
          loading={state.type === Type.submitMatchColumns}
          error={state.type === Type.submitMatchColumnsError ? state.error : undefined}
          onContinue={(values) => {
            if (state.type === Type.matchColumns || state.type === Type.submitMatchColumnsError) {
              setState({
                type: Type.submitMatchColumns,
                data: state.data,
                headerValues: state.headerValues,
                table: state.table,
                values,
              })
            }
          }}
        />
      )
    case Type.loadMatchColumns:
      return <Progress isIndeterminate />
    default:
      return null
  }
}
