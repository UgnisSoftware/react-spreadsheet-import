import { Upload } from "./Upload"
import { SelectHeader } from "./SelectHeader"
import { MatchColumns } from "./MatchColumns"
import React from "react"
import { ignoreState, useLape } from "lape"
import { Progress } from "@chakra-ui/react"

enum Type {
  upload,
  selectHeader,
  loadMatchColumns,
  loadMatchColumnsError,
  matchColumns,
  submitMatchColumns,
  submitMatchColumnsError,
}

type StateType =
  | {
      type: Type.upload
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

type State = {
  step: StateType
}

interface Props {
  config: any
}

export const UploadFlow = ({ config }: Props) => {
  const state = useLape<State>({
    step: { type: Type.upload },
  })

  switch (state.step.type) {
    case Type.upload:
      return (
        <Upload
          onContinue={(data) => {
            state.step = ignoreState({ type: Type.selectHeader, data })
          }}
        />
      )
    case Type.selectHeader:
      return (
        <SelectHeader
          data={state.step.data}
          onContinue={(headerValues: string[], data: string[][]) => {
            state.step = ignoreState({
              type: Type.loadMatchColumns,
              headerValues,
              data,
            })
          }}
          onCancel={() => {
            state.step = ignoreState({ type: Type.upload })
          }}
        />
      )
    case Type.matchColumns:
    case Type.submitMatchColumns:
    case Type.submitMatchColumnsError:
      return (
        <MatchColumns
          headerValues={state.step.headerValues}
          onCancel={() => {
            state.step = ignoreState({ type: Type.upload })
          }}
          values={state.step.values}
          table={state.step.table}
          loading={state.step.type === Type.submitMatchColumns}
          error={state.step.type === Type.submitMatchColumnsError ? state.step.error : undefined}
          onContinue={(values) => {
            if (state.step.type === Type.matchColumns || state.step.type === Type.submitMatchColumnsError) {
              state.step = ignoreState({
                type: Type.submitMatchColumns,
                data: state.step.data,
                headerValues: state.step.headerValues,
                table: state.step.table,
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
