import type { InfoWithSource, RawData } from "@/types"
import type XLSX from "xlsx-ugnis"

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: any[]
    }

export type Meta = { __index: string; __errors?: Error | null }
export type Error = { [key: string]: InfoWithSource }
export type Errors = { [id: string]: Error }

export enum ColumnType {
  empty,
  ignored,
  matched,
  matchedCheckbox,
  matchedSelect,
  matchedSelectOptions,
}

export type MatchedOptions<T> = {
  entry: string
  value: T
}

type EmptyColumn = { type: ColumnType.empty; index: number; header: string }
type IgnoredColumn = { type: ColumnType.ignored; index: number; header: string }
type MatchedColumn<T> = { type: ColumnType.matched; index: number; header: string; value: T }
type MatchedSwitchColumn<T> = { type: ColumnType.matchedCheckbox; index: number; header: string; value: T }
export type MatchedSelectColumn<T> = {
  type: ColumnType.matchedSelect
  index: number
  header: string
  value: T
  matchedOptions: Partial<MatchedOptions<T>>[]
}
export type MatchedSelectOptionsColumn<T> = {
  type: ColumnType.matchedSelectOptions
  index: number
  header: string
  value: T
  matchedOptions: MatchedOptions<T>[]
}

export type Column<T extends string> =
  | EmptyColumn
  | IgnoredColumn
  | MatchedColumn<T>
  | MatchedSwitchColumn<T>
  | MatchedSelectColumn<T>
  | MatchedSelectOptionsColumn<T>

export type Columns<T extends string> = Column<T>[]
