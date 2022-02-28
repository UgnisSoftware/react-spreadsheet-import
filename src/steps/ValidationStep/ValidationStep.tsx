import React, { useCallback, useMemo, useState } from "react"
import { Box, Button, Heading, ModalBody, Switch } from "@chakra-ui/react"
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
}

export const ValidationStep = <T,>({ initialData }: Props<T>) => {
  const { fields, onSubmit, rowHook, tableHook, initialHook = (table) => table } = useRsi()

  const [data, setData] = useState<(T & Meta)[]>(
    useMemo(() => addErrorsAndRunHooks(addIndexes(initialHook(initialData)), fields, rowHook, tableHook), []),
  )
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<number | string>>(new Set())
  const [filterByErrors, setFilterByErrors] = useState(false)

  const deleteSelectedRows = () => {
    if (selectedRows.size) {
      const newData = data.filter((value) => !selectedRows.has(value.__index))
      updateRow(newData)
      setSelectedRows(new Set())
    }
  }

  const updateRow = useCallback(
    (rows: typeof data) => {
      setData(addErrorsAndRunHooks(rows, fields, rowHook, tableHook))
    },
    [setData, addErrorsAndRunHooks, rowHook, tableHook],
  )

  const columns = useMemo(() => generateColumns(fields), [fields, generateColumns])

  const tableData = useMemo(() => {
    if (filterByErrors) {
      return data.filter((value) => value?.__errors)
    }
    return data
  }, [data, filterByErrors])

  const rowKeyGetter = useCallback((row: T & Meta) => row.__index, [])

  const onContinue = () => {
    const all = data.map(({ __index, __errors, ...value }) => ({ ...value })) as unknown as T[]
    const validData = all.filter((value, index) => {
      const originalValue = data[index]
      if (originalValue?.__errors) {
        return !Object.values(originalValue.__errors)?.filter((err) => err.level === "error").length
      }
      return true
    })
    const invalidData = all.filter((value) => !validData.includes(value))
    onSubmit({ validData: validData, invalidData: invalidData, all: all })
  }

  return (
    <>
      <ModalBody pb={0}>
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
          rowKeyGetter={rowKeyGetter}
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
      </ModalBody>
      <ContinueButton onContinue={onContinue} title={BUTTON_TITLE} />
    </>
  )
}
