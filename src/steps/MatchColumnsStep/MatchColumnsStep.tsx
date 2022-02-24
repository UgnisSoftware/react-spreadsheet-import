import React, { useCallback, useState } from "react"
import { UserTableColumn } from "./components/UserTableColumn"
import { useRsi } from "../../hooks/useRsi"
import { TemplateColumn } from "./components/TemplateColumn"
import { ColumnGrid } from "./components/ColumnGrid"
import { setColumn } from "./utils/setColumn"
import { setIgnoreColumn } from "./utils/setIgnoreColumn"
import { setSubColumn } from "./utils/setSubColumn"

export type MatchColumnsProps = {
  data: (string | number)[][]
  headerIndex: number
}

export enum ColumnType {
  empty,
  ignored,
  matched,
  matchedSelect,
  matchedSelectOptions,
}

export type MatchedOptions = {
  entry: string | number
  value: string
}

type EmptyColumn = { type: ColumnType.empty; index: number; header: string }
type IgnoredColumn = { type: ColumnType.ignored; index: number; header: string }
type MatchedColumn = { type: ColumnType.matched; index: number; header: string; value: string }
export type MatchedSelectColumn = {
  type: ColumnType.matchedSelect
  index: number
  header: string
  value: string
  matchedOptions: Partial<MatchedOptions>[]
}
export type MatchedSelectOptionsColumn = {
  type: ColumnType.matchedSelectOptions
  index: number
  header: string
  value: string
  matchedOptions: MatchedOptions[]
}

export type Column = EmptyColumn | IgnoredColumn | MatchedColumn | MatchedSelectColumn | MatchedSelectOptionsColumn

export type Columns = Column[]

export const MatchColumnsStep = ({ data, headerIndex }: MatchColumnsProps) => {
  const header = data[headerIndex].map((el) => el.toString())
  const trimmedData = data.slice(headerIndex + 1)
  const dataExample = trimmedData.slice(0, 2)
  const [columns, setColumns] = useState<Columns>(
    header.map((headerValues, index) => ({ type: ColumnType.empty, index, header: headerValues })),
  )
  const { fields } = useRsi()

  const onChange = useCallback(
    (value, columnIndex) => {
      const field = fields.find((field) => field.key === value)
      setColumns(
        columns.map((column, index) => (columnIndex === index ? setColumn(column, field, trimmedData) : column)),
      )
    },
    [columns, setColumns],
  )

  const onIgnore = useCallback(
    (columnIndex) => {
      setColumns(columns.map((column, index) => (columnIndex === index ? setIgnoreColumn(column) : column)))
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

  return (
    <ColumnGrid
      columns={columns}
      onContinue={() => {}}
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
