import type { Fields, InitHook, RowHook, TableHook } from "../../../types"
import type { Data, Meta } from "../types"
import { useMemo, useState } from "react"
import { Table } from "../../../components/Table"
import { generateColumns } from "./columns"
import { addErrorsAndRunHooks, addIndexes } from "../utils/dataMutations"

interface Props<T> {
  fields: Fields<T>
  initialData: T[]
  rowHook?: RowHook<T>
  tableHook?: TableHook<T>
  initialHook?: InitHook<T>
}

export const ValidationTable = <T extends Data>({
  fields,
  initialData,
  rowHook,
  tableHook,
  initialHook = (table) => table,
}: Props<T>) => {
  const [data, setData] = useState<(T & Meta)[]>(
    addErrorsAndRunHooks(addIndexes(initialHook(initialData)), fields, rowHook, tableHook),
  )
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<number | string>>(new Set())

  const updateRow = (rows: typeof data) => {
    setData(addErrorsAndRunHooks(rows, fields, rowHook, tableHook))
  }
  const columns = useMemo(() => generateColumns(fields), [])

  return (
    <Table
      rowKeyGetter={(row) => row.__index}
      rows={data}
      onRowsChange={updateRow}
      columns={columns}
      selectedRows={selectedRows}
      onSelectedRowsChange={setSelectedRows}
    />
  )
}
