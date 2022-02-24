import React, { useMemo, useState } from "react"
import { Box, Heading } from "@chakra-ui/react"
import { ContinueButton } from "../../components/ContinueButton"
import { useRsi } from "../../hooks/useRsi"
import type { Meta } from "./types"
import { addErrorsAndRunHooks, addIndexes } from "./utils/dataMutations"
import { generateColumns } from "./components/columns"
import { Table } from "../../components/Table"

const VALIDATION_HEADER_TITLE = "Review data"
const BUTTON_TITLE = "Confirm"

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

  const updateRow = (rows: typeof data) => {
    setData(addErrorsAndRunHooks(rows, fields, rowHook, tableHook))
  }
  const columns = useMemo(() => generateColumns(fields), [])

  return (
    <>
      <Box display="flex" p="2rem" pb={0} flexDirection="column" flex={1} overflow="auto" height="100%">
        <Heading size="lg" color="gray.700" mb="2rem">
          {VALIDATION_HEADER_TITLE}
        </Heading>
        <Table
          rowKeyGetter={(row) => row.__index}
          rows={data}
          onRowsChange={updateRow}
          columns={columns}
          selectedRows={selectedRows}
          onSelectedRowsChange={setSelectedRows}
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
