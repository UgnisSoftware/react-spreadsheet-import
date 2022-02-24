import React, { useCallback, useState } from "react"
import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { FadingWrapper } from "../../components/FadingWrapper"
import { UserTableColumn } from "./components/UserTableColumn"
import { useRsi } from "../../hooks/useRsi"
import { TemplateColumn } from "./components/TemplateColumn"
import type { Field } from "../../types"
import uniqBy from "lodash/uniqBy"
import { ColumnGrid } from "./components/ColumnGrid"

type MatchColumnsProps = {
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

type MatchedOptions = {
  entry: string | number
  value: string
}

export type Column =
  | { type: ColumnType.empty; index: number; header: string }
  | { type: ColumnType.ignored; index: number; header: string }
  | { type: ColumnType.matched; index: number; header: string; value: string }
  | {
      type: ColumnType.matchedSelect
      index: number
      header: string
      value: string
      matchedOptions: Partial<MatchedOptions>[]
    }
  | {
      type: ColumnType.matchedSelectOptions
      index: number
      header: string
      value: string
      matchedOptions: MatchedOptions[]
    }

export type Columns = Column[]

const uniqueEntries = (data: MatchColumnsProps["data"], index: number): Partial<MatchedOptions>[] =>
  uniqBy(
    data.map((row) => ({ entry: row[index] })),
    "entry",
  )

const setColumn = (oldColumn: Column, field?: Field<any>, data?: MatchColumnsProps["data"]): Column => {
  switch (field?.fieldType.type) {
    case "select":
      return {
        ...oldColumn,
        type: ColumnType.matchedSelect,
        value: field.key,
        matchedOptions: uniqueEntries(data || [], oldColumn.index),
      }
    case "checkbox":
    case "input":
      return { index: oldColumn.index, type: ColumnType.matched, value: field.key, header: oldColumn.header }
    default:
      return { index: oldColumn.index, header: oldColumn.header, type: ColumnType.empty }
  }
}

const setIgnoredColumn = ({ header, index }: Column): Column => ({ header, index, type: ColumnType.ignored })

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
      setColumns(columns.map((column, index) => (columnIndex === index ? setIgnoredColumn(column) : column)))
    },
    [columns, setColumns],
  )

  const onRevertIgnore = useCallback(
    (columnIndex) => {
      setColumns(columns.map((column, index) => (columnIndex === index ? setColumn(column) : column)))
    },
    [columns, setColumns],
  )

  return (
    <ColumnGrid
      columns={columns}
      userColumn={(column) => (
        <UserTableColumn
          column={column}
          onIgnore={onIgnore}
          onRevertIgnore={onRevertIgnore}
          entries={dataExample.map((row) => row[column.index])}
        />
      )}
      templateColumn={(column) => <TemplateColumn column={column} onChange={onChange} />}
    />
  )
}
