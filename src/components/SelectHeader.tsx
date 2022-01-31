import React, { useCallback, useMemo } from "react"
import {Box, Button, Checkbox, Text} from "@chakra-ui/react"
import Table, { useRowSelection } from "react-data-grid"
import {ignoreState, useLape} from "lape";

const SELECT_HEADER_TITLE = "Select header row"
const CANCEL_BUTTON_TITLE = "Cancel"
const CONFIRM_BUTTON_TITLE = "Confirm and continue"
const NO_SELECTION_ERROR = "Header row not selected"

type TableCheckbox = React.ComponentProps<typeof Table>["columns"][number]["formatter"]

const TableCheckbox: TableCheckbox = (props) => {
  const [isRowSelected, onRowSelectionChange] = useRowSelection()

  return (
    <Box h="100%" display="flex" alignItems="center">
      <Checkbox
        isChecked={isRowSelected}
        onChange={(e) => {
          onRowSelectionChange({
            row: props.row,
            checked: (e.target as any).checked,
            isShiftClick: (e.nativeEvent as MouseEvent).shiftKey,
          })
        }}
      />
    </Box>
  )
}

type SelectHeaderProps = {
  data: string[][]
  onCancel: () => void
  onContinue: (headerValues: string[], data: string[][]) => void
}

export const SelectHeader = ({ data, onCancel, onContinue }: SelectHeaderProps) => {
  const state = useLape<{ selectedRow: ReadonlySet<any>; error?: string }>({
    selectedRow: ignoreState(new Set()),
  })

  const rowLength = useMemo(() => Math.max(...data.map((row) => row.length)), [data])
  const columns = useMemo(
    () => [
      {
        key: "cx",
        name: "cx",
        formatter: TableCheckbox,
        maxWidth: 40,
        width: 40,
      },
      ...Array.from({ length: rowLength }).map((_, index) => ({
        key: index + "",
        name: index + "",
        resizable: true,
      })),
    ],
    [rowLength],
  )

  const rowKeyGetter = useCallback((row) => row, [])
  const handleContinue = useCallback(() => {
    const [selectedRow] = state.selectedRow
    if (!selectedRow) {
      state.error = NO_SELECTION_ERROR
      return
    }
    // We consider data above header to be redundant
    const headerIndex = data.findIndex((row) => row === selectedRow)
    const trimmedData = data.slice(headerIndex + 1)
    onContinue(selectedRow, trimmedData)
  }, [onContinue, data])

  return (
    <>
      <Box minH="5.375rem" display="flex" alignItems="center" px="0.75rem">
        <Text variant="h5" mr="1rem" pb={1}>
          {SELECT_HEADER_TITLE}
        </Text>
        <Box display="flex" flex={1} justifyContent="flex-end">
          <Button variant="outline" mr="1rem" onClick={onCancel}>
            {CANCEL_BUTTON_TITLE}
          </Button>
          <Button onClick={handleContinue}>{CONFIRM_BUTTON_TITLE}</Button>
        </Box>
      </Box>
      {state.error && (
        <Text color="error.500" px="0.75rem" pb="0.75rem">
          {state.error}
        </Text>
      )}
      <Box display="flex" flex={1} px={1} pb="2rem">
        <Table
          rowKeyGetter={rowKeyGetter}
          rows={data as any}
          columns={columns}
          headerRowHeight={0}
          selectedRows={state.selectedRow}
          onSelectedRowsChange={(rows) => {
            state.error = undefined
            const size = rows.size
            if (size === 1) {
              state.selectedRow = ignoreState(rows)
            } else {
              const [_, newItem] = rows
              // react-data-grid only accepts Sets
              state.selectedRow = ignoreState(new Set([newItem]))
            }
          }}
          className="rdg-static"
        />
      </Box>
    </>
  )
}
