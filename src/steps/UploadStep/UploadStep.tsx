import { useRSIContext } from "@/contexts/RSIContext"
import { Dialog, Heading, Text, Box, useSlotRecipe } from "@chakra-ui/react"
import type XLSX from "xlsx-ugnis"
import { FadingOverlay } from "@/steps/UploadStep/components/FadingOverlay"
import { DropZone } from "@/steps/UploadStep/components/DropZone"
import { useCallback, useState } from "react"
import { ExampleTable } from "@/steps/UploadStep/components/ExampleTable"

type UploadStepProps = {
  onContinue: (data: XLSX.WorkBook, file: File) => Promise<void>
}

export function UploadStep(props: UploadStepProps) {
  const { onContinue } = props

  const [isLoading, setIsLoading] = useState(false)

  const { fields, translations } = useRSIContext()
  const recipe = useSlotRecipe({ key: "uploadStep" })
  const styles = recipe()

  const handleOnContinue = useCallback(
    async (data: XLSX.WorkBook, file: File) => {
      setIsLoading(true)
      await onContinue(data, file)
      setIsLoading(false)
    },
    [onContinue],
  )

  return (
    <Dialog.Body>
      <Heading variant="rsi">{translations.uploadStep.title}</Heading>
      <Text css={styles.title}>{translations.uploadStep.manifestTitle}</Text>
      <Text css={styles.subtitle}>{translations.uploadStep.manifestDescription}</Text>
      <Box css={styles.tableWrapper}>
        <ExampleTable fields={fields} />
        <FadingOverlay />
      </Box>
      <DropZone onContinue={handleOnContinue} isLoading={isLoading} />
    </Dialog.Body>
  )
}
