import { Flex, Heading, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import { useState } from "react"
import type XLSX from "xlsx"

const TITLE = "Select the sheet to use"

type SelectSheetProps = {
  sheetNames: string[]
  onContinue: (sheetName: string) => void
}

export const SelectSheet = ({ sheetNames, onContinue }: SelectSheetProps) => {
  const [value, setValue] = useState(sheetNames[0])
  return (
    <Flex direction="column" alignItems="center" justifyContent="center" p={8} flex={1}>
      <Heading size="lg" mb={8}>
        {TITLE}
      </Heading>
      <RadioGroup onChange={(value) => setValue(value)} value={value}>
        <Stack spacing={8}>
          {sheetNames.map((sheetName) => (
            <Radio value={sheetName}>{sheetName}</Radio>
          ))}
        </Stack>
      </RadioGroup>
    </Flex>
  )
}
