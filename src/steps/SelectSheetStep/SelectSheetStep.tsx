import { Heading, ModalBody, Radio, RadioGroup, Stack, useStyleConfig, Text } from "@chakra-ui/react"
import { useCallback, useState } from "react"
import { ContinueButton } from "../../components/ContinueButton"
import { useRsi } from "../../hooks/useRsi"
import type { themeOverrides } from "../../theme"

type SelectSheetProps = {
  sheetNames: string[]
  onContinue: (sheetName: string) => Promise<void>
}

export const SelectSheetStep = ({ sheetNames, onContinue }: SelectSheetProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { translations } = useRsi()
  const [value, setValue] = useState(sheetNames[0])
  const styles = useStyleConfig(
    "SelectSheetStep",
  ) as typeof themeOverrides["components"]["SelectSheetStep"]["baseStyle"]
  const handleOnContinue = useCallback(
    async (data) => {
      setIsLoading(true)
      await onContinue(data)
      setIsLoading(false)
    },
    [onContinue],
  )

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
        isLoading={isLoading}
        onContinue={() => handleOnContinue(value)}
        title={translations.uploadStep.selectSheet.nextButtonTitle}
      />
    </>
  )
}
