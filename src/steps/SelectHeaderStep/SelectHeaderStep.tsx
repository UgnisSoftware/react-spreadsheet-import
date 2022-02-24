import React, { useCallback, useState } from "react"
import { Box, Heading } from "@chakra-ui/react"
import { SelectHeaderTable } from "./components/SelectHeaderTable"
import { ContinueButton } from "../../components/ContinueButton"

const SELECT_HEADER_TITLE = "Select header row"

type SelectHeaderProps = {
  data: string[][]
  onContinue: (headerValues: string[], data: string[][]) => void
}

export const SelectHeaderStep = ({ data, onContinue }: SelectHeaderProps) => {
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(new Set([0]))

  const handleContinue = useCallback(() => {
    const [selectedRowIndex] = selectedRows
    // We consider data above header to be redundant
    const trimmedData = data.slice(selectedRowIndex + 1)
    onContinue(data[selectedRowIndex], trimmedData)
  }, [onContinue, data])

  return (
    <>
      <Box display="flex" p="2rem" pb={0} flexDirection="column" flex={1} overflow="auto" height="100%">
        <Heading size="lg" color="gray.700" mb="2rem">
          {SELECT_HEADER_TITLE}
        </Heading>
        <SelectHeaderTable data={data} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
      </Box>
      <ContinueButton onContinue={handleContinue} />
    </>
  )
}
