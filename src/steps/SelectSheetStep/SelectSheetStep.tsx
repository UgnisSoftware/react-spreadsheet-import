import { ContinueButton } from "@/components/ContinueButton"
import { Radio, RadioGroup } from "@/components/ui/Radio"
import { useRSIContext } from "@/contexts/RSIContext"
import { Dialog, Heading, Stack, useSlotRecipe } from "@chakra-ui/react"
import { useCallback, useState } from "react"

type SelectSheetProps = {
  sheetNames: string[]
  onContinue: (sheetName: string) => Promise<void>
  onBack?: () => void
}

export const SelectSheetStep = ({ sheetNames, onContinue, onBack }: SelectSheetProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { translations } = useRSIContext()
  const [value, setValue] = useState(sheetNames[0])

  const recipe = useSlotRecipe({ key: "selectSheetStep" })
  const styles = recipe()

  const handleOnContinue = useCallback(
    async (data: typeof value) => {
      setIsLoading(true)
      await onContinue(data)
      setIsLoading(false)
    },
    [onContinue],
  )

  return (
    <>
      <Dialog.Body alignItems="center" justifyContent="center" p={8} flex={1}>
        <Heading variant="rsi">{translations.uploadStep.selectSheet.title}</Heading>
        <RadioGroup onValueChange={(e) => setValue(e.value!)} value={value}>
          <Stack gap={8}>
            {sheetNames.map((sheetName) => (
              <Radio key={sheetName} value={sheetName} css={styles.radio}>
                {sheetName}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </Dialog.Body>
      <ContinueButton
        isLoading={isLoading}
        onContinue={() => handleOnContinue(value)}
        onBack={onBack}
        title={translations.uploadStep.selectSheet.nextButtonTitle}
        backTitle={translations.uploadStep.selectSheet.backButtonTitle}
      />
    </>
  )
}
