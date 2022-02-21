import type { Fields, InitHook, RowHook, TableHook } from "../../types"
import type { Data, Meta } from "./types"
import { useMemo, useState } from "react"
import { EditableTable } from "../EditableTable"
import { generateColumns } from "./columns"
import { addErrorsAndRunHooks, addIndexes } from "./dataMutations"

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
    <EditableTable
      rowKeyGetter={(row) => row.__index}
      rows={data}
      onRowsChange={updateRow}
      columns={columns}
      selectedRows={selectedRows}
      onSelectedRowsChange={setSelectedRows}
    />
  )
}
