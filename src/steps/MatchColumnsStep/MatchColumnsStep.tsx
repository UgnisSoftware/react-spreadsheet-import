import React, { useCallback, useEffect, useState } from "react"
import { UserTableColumn } from "./components/UserTableColumn"
import { useRsi } from "../../hooks/useRsi"
import { TemplateColumn } from "./components/TemplateColumn"
import { ColumnGrid } from "./components/ColumnGrid"
import { setColumn } from "./utils/setColumn"
import { setIgnoreColumn } from "./utils/setIgnoreColumn"
import { setSubColumn } from "./utils/setSubColumn"
import { normalizeTableData } from "./utils/normalizeTableData"
import type { Field } from "../../types"
import { getMatchedColumns } from "./utils/getMatchedColumns"

export type MatchColumnsProps = {
  data: (string | number)[][]
  headerValues: string[]
  onContinue: (data: any[]) => void
}

export enum ColumnType {
  empty,
  ignored,
  matched,
  matchedSelect,
  matchedSelectOptions,
}

export type MatchedOptions<T> = {
  entry: string | number
  value: T
}

type EmptyColumn = { type: ColumnType.empty; index: number; header: string }
type IgnoredColumn = { type: ColumnType.ignored; index: number; header: string }
type MatchedColumn<T> = { type: ColumnType.matched; index: number; header: string; value: T }
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
  | MatchedSelectColumn<T>
  | MatchedSelectOptionsColumn<T>

export type Columns<T extends string> = Column<T>[]

export const MatchColumnsStep = <T extends string>({ data, headerValues, onContinue }: MatchColumnsProps) => {
  const dataExample = data.slice(0, 2)
  const { fields, autoMapHeaders, autoMapDistance } = useRsi<T>()
  const [columns, setColumns] = useState<Columns<T>>(
    headerValues.map((value, index) => ({ type: ColumnType.empty, index, header: value })),
  )

  const onChange = useCallback(
    (value: T, columnIndex: number) => {
      const field = fields.find((field) => field.key === value) as unknown as Field<T>
      setColumns(
        columns.map<Column<T>>((column, index) => (columnIndex === index ? setColumn(column, field, data) : column)),
      )
    },
    [columns, setColumns],
  )

  const onIgnore = useCallback(
    (columnIndex) => {
      setColumns(columns.map((column, index) => (columnIndex === index ? setIgnoreColumn<T>(column) : column)))
    },
    [columns, setColumns],
  )

  const onRevertIgnore = useCallback(
    (columnIndex) => {
      setColumns(columns.map((column, index) => (columnIndex === index ? setColumn(column) : column)))
    },
    [columns, setColumns],
  )

  const onSubChange = useCallback(
    (value, columnIndex, entry) => {
      setColumns(
        columns.map((column, index) =>
          columnIndex === index && "matchedOptions" in column ? setSubColumn(column, entry, value) : column,
        ),
      )
    },
    [columns, setColumns],
  )

  useEffect(() => {
    if (autoMapHeaders) {
      setColumns(getMatchedColumns(columns, fields, data, autoMapDistance))
    }
  }, [])

  return (
    <ColumnGrid
      columns={columns}
      onContinue={() => onContinue(normalizeTableData(columns, data))}
      userColumn={(column) => (
        <UserTableColumn
          column={column}
          onIgnore={onIgnore}
          onRevertIgnore={onRevertIgnore}
          entries={dataExample.map((row) => row[column.index])}
        />
      )}
      templateColumn={(column) => <TemplateColumn column={column} onChange={onChange} onSubChange={onSubChange} />}
    />
  )
}
