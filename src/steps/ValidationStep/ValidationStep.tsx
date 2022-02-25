import React, { useMemo, useState } from "react"
import { Box, Button, Heading, Switch } from "@chakra-ui/react"
import { ContinueButton } from "../../components/ContinueButton"
import { useRsi } from "../../hooks/useRsi"
import type { Meta } from "./types"
import { addErrorsAndRunHooks, addIndexes } from "./utils/dataMutations"
import { generateColumns } from "./components/columns"
import { Table } from "../../components/Table"

const VALIDATION_HEADER_TITLE = "Review data"
const BUTTON_TITLE = "Confirm"
const NO_ROWS_MESSAGE = "No data found"
const NO_ROWS_MESSAGE_WHEN_FILTERED = "No data containing errors"
const DISCARD_BUTTON_TITLE = "Discard selected rows"
const FILTER_SWITCH_TITLE = "Show only rows with errors"

type Props<T> = {
  initialData: T[]
  onSubmit: (data: T[]) => void
}

export const ValidationStep = <T,>({ initialData, onSubmit }: Props<T>) => {
  const { fields, rowHook, tableHook, initialHook = (table) => table } = useRsi()

  const [data, setData] = useState<(T & Meta)[]>(
    addErrorsAndRunHooks(addIndexes(initialHook(initialData)), fields, rowHook, tableHook),
  )
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<number | string>>(new Set())
  const [filterByErrors, setFilterByErrors] = useState(false)

  const updateRow = (rows: typeof data) => {
    setData(addErrorsAndRunHooks(rows, fields, rowHook, tableHook))
  }
  const columns = useMemo(() => generateColumns(fields), [])

  const deleteSelectedRows = () => {
    if (selectedRows.size) {
      const newData = data.filter((value) => !selectedRows.has(value.__index))
      updateRow(newData)
      setSelectedRows(new Set())
    }
  }

  const tableData = useMemo(() => {
    if (filterByErrors) {
      return data.filter((value) => value?.__errors)
    }
    return data
  }, [data, filterByErrors])

  return (
    <>
      <Box display="flex" p="2rem" pb={0} flexDirection="column" flex={1} overflow="auto" height="100%">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb="2rem">
          <Heading size="lg" color="gray.700">
            {VALIDATION_HEADER_TITLE}
          </Heading>
          <Box display="flex" gap="16px" alignItems="center">
            <Button variant="outline" size="sm" onClick={deleteSelectedRows}>
              {DISCARD_BUTTON_TITLE}
            </Button>
            <Switch isChecked={filterByErrors} onChange={() => setFilterByErrors(!filterByErrors)}>
              {FILTER_SWITCH_TITLE}
            </Switch>
          </Box>
        </Box>
        <Table
          rowKeyGetter={(row) => row.__index}
          rows={tableData}
          onRowsChange={updateRow}
          columns={columns}
          selectedRows={selectedRows}
          onSelectedRowsChange={setSelectedRows}
          components={{
            noRowsFallback: (
              <Box display="flex" justifyContent="center" gridColumn="1/-1" mt="32px">
                {filterByErrors ? NO_ROWS_MESSAGE_WHEN_FILTERED : NO_ROWS_MESSAGE}
              </Box>
            ),
          }}
        />
      </Box>
      <ContinueButton
        onContinue={() => {
          const d = data.map(({ __index, __errors, ...value }) => ({ ...value })) as unknown as T[]
          onSubmit(d)
        }}
        title={BUTTON_TITLE}
      />
    </>
  )
}
