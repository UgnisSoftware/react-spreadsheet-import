import { Box, Input, Switch } from "@chakra-ui/react"
import { EditableTable } from "../components/EditableTable"
import { connect, useLape } from "lape"
import type { ChangeEvent } from "react"
export default {
  title: "React spreadsheet import",
}

const TableComponent = connect(() => {
  const data = [
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
    {
      test: "Hello",
    },
  ]

  const columnDef = [
    {
      uniqueIdentifier: "test",
      name: "Tests",
      type: "String",
    },
  ]

  const state = useLape<{
    data: any[]
    errorCount: number
    filterErrors: boolean
  }>({
    data: data,
    errorCount: 0,
    filterErrors: false,
  })

  const updateRow = (row: any, key: string) => (event: ChangeEvent<HTMLInputElement>) => {
    row[key] = event.target.value
  }
  const updateSwitch = () => {}
  const columns = columnDef.map((column: any) => ({
    key: column.uniqueIdentifier,
    name: column.name,
    resizable: true,
    editable: column.type !== "BOOLEAN",
    editor: ({ row }: any) => (
      <Box pl="0.5rem">
        <Input
          variant="unstyled"
          autoFocus
          size="small"
          value={row[column.uniqueIdentifier]}
          onChange={updateRow(row, column.uniqueIdentifier)}
        />
      </Box>
    ),
    editorOptions: {
      editOnClick: true,
    },
    formatter: ({ row }: any) =>
      column.type === "BOOLEAN" ? (
        <Box display="flex" alignItems="center" height="100%">
          <Switch onChange={updateSwitch} />
        </Box>
      ) : (
        row[column.uniqueIdentifier]
      ),
    cellClass: (row: { _errors: any[] | null; id: string }) =>
      row._errors?.length && row._errors.find((err) => err.fieldName === column.uniqueIdentifier)
        ? "rdg-cell-error"
        : "",
  }))

  return (
    <div style={{ blockSize: "calc(100vh - 32px)" }}>
      <EditableTable rows={state.data} columns={columns} />
    </div>
  )
})

export const Table = () => <TableComponent />
