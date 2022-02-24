import type { Fields, InitHook, RowHook, TableHook } from "../../../types"
import { useMemo, useState } from "react"
import { Table } from "../../../components/Table"
import { generateColumns } from "./columns"
import { generateExampleRow } from "../utils/generateExampleRow"

interface Props<T> {
  fields: Fields<T>
}

export const ExampleTable = <T,>({ fields }: Props<T>) => {
  const data = useMemo(() => generateExampleRow(fields), [])
  const columns = useMemo(() => generateColumns(fields), [])

  return <Table rows={data} columns={columns} className={'rdg-example'}/>
}
