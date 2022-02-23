import { Flex, Heading, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import { useState } from "react"
import { ContinueButton } from "../../components/ContinueButton"

const TITLE = "Select the sheet to use"

type SelectSheetProps = {
  sheetNames: string[]
  onContinue: (sheetName: string) => void
}

export const SelectSheetStep = ({ sheetNames, onContinue }: SelectSheetProps) => {
  const [value, setValue] = useState(sheetNames[0])
  return (
    <Flex flex={1} flexDirection="column">
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
      <ContinueButton onContinue={() => onContinue(value)} />
    </Flex>
  )
}
