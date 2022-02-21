import { useMemo, useState } from "react"
import { EditableTable } from "../EditableTable"
import { generateSelectionColumns } from "./columns"

interface Props {
  initialData: string[][]
}

export const SelectHeaderTable = ({ initialData }: Props) => {
  const [data] = useState<string[][]>(initialData)
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<number | string>>(new Set())

  const columns = useMemo(() => generateSelectionColumns(data), [])

  return (
    <EditableTable
      rowKeyGetter={(row) => data.indexOf(row)}
      rows={data}
      columns={columns}
      selectedRows={selectedRows}
      onSelectedRowsChange={(newRows) => {
        // allow selecting only one row
        newRows.forEach((value) => {
          if (!selectedRows.has(value)) {
            setSelectedRows(new Set([value]))
            return
          }
        })
      }}
      onRowClick={(row) => {
        setSelectedRows(new Set([data.indexOf(row)]))
      }}
      headerRowHeight={0}
      className="rdg-static"
    />
  )
}
