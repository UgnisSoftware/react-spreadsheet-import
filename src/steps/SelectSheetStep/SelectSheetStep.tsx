import { Heading, ModalBody, Radio, RadioGroup, Stack, useStyleConfig, Text } from "@chakra-ui/react"
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
  const styles = useStyleConfig("SelectSheetStep") as any

  return (
    <>
      <ModalBody alignItems="center" justifyContent="center" p={8} flex={1}>
        <Heading {...styles.heading}>{translations.uploadStep.selectSheet.title}</Heading>
        <RadioGroup onChange={(value) => setValue(value)} value={value}>
          <Stack spacing={8}>
            {sheetNames.map((sheetName) => (
              <Radio value={sheetName} key={sheetName} {...styles.radio}>
                <Text {...styles.radioLabel}>{sheetName}</Text>
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
