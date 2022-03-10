import { Heading, ModalBody, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import { useState } from "react"
import { ContinueButton } from "../../components/ContinueButton"
import { useRsi } from "../../hooks/useRsi"

type SelectSheetProps = {
  sheetNames: string[]
  onContinue: (sheetName: string) => void
}

export const SelectSheetStep = ({ sheetNames, onContinue }: SelectSheetProps) => {
  const { translations } = useRsi()
  const [value, setValue] = useState(sheetNames[0])

  return (
    <>
      <ModalBody alignItems="center" justifyContent="center" p={8} flex={1}>
        <Heading size="lg" mb={8}>
          {translations.uploadStep.selectSheet.title}
        </Heading>
        <RadioGroup onChange={(value) => setValue(value)} value={value}>
          <Stack spacing={8}>
            {sheetNames.map((sheetName) => (
              <Radio value={sheetName} key={sheetName}>
                {sheetName}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </ModalBody>
      <ContinueButton
        onContinue={() => onContinue(value)}
        title={translations.uploadStep.selectSheet.nextButtonTitle}
      />
    </>
  )
}
