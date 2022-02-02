import { Box, Input, Switch, Table, Text, useToast, Progress } from "@chakra-ui/react"
import React, { useMemo } from "react"
import { useLape } from "lape"

interface Props {
  id: string
}

const SEARCH = "Search"
const UPLOAD = "Upload"

const EditableTable = ({ id }: Props) => {
  const toast = useToast()

  const table = {
    name: "Name",
    columns: [],
  }

  const state = useLape<{
    tableName?: string
    data?: any[]
    loading: boolean
    errorCount: number
    filterErrors: boolean
    saveStatus: "saving" | "saved" | "error" | null
  }>({
    tableName: undefined,
    data: undefined,
    loading: true,
    errorCount: 0,
    filterErrors: false,
    saveStatus: null,
  })

  const updateRow = () => {}
  const updateSwitch = () => {}
  const columns = table?.columns.map((column: any) => ({
    key: column.uniqueIdentifier,
    name: column.name,
    resizable: true,
    editable: column.type !== "BOOLEAN",
    editor: ({ row }: any) => (
      <Box pl="0.5rem">
        <Input variant="unstyled" autoFocus size="small" value={row[column.uniqueIdentifier]} onChange={updateRow} />
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

  if (state.loading || !table || !columns) {
    return <Progress isIndeterminate />
  }

  return (
    <>
      <Box minH="5.375rem" display="flex" alignItems="center" px="0.75rem">
        <Box display="flex" alignItems="baseline">
          <Text variant="h5" mr="1rem">
            {table.name}
          </Text>
        </Box>
      </Box>
      {!!state.errorCount && (
        <Box
          bg="error.50"
          mx={1}
          mb={1}
          px={1}
          py={0.5}
          borderRadius="8px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          {state.errorCount === 1 ? (
            <Text>
              There is{" "}
              <Text fontWeight="bold" display="inline">
                {state.errorCount}
              </Text>{" "}
              error in this table
            </Text>
          ) : (
            <Text>
              There are{" "}
              <Text fontWeight="bold" display="inline">
                {state.errorCount}
              </Text>{" "}
              errors in this table
            </Text>
          )}
          <Box>
            <Switch textPosition="left" onChange={() => (state.filterErrors = !state.filterErrors)}>
              Show only rows with errors
            </Switch>
          </Box>
        </Box>
      )}
      <Box display="flex" flex={1} px={1}>
        {!state.data?.length ? (
          <Text>No data yet</Text>
        ) : (
          <Table rows={state.data as any} columns={columns} rowKeyGetter={(row: any) => row.id} />
        )}
      </Box>
    </>
  )
}
