import { useRSIContext } from "@/contexts/RSIContext"
import { Dialog, Button, Box, Text } from "@chakra-ui/react"
import { useRef } from "react"

interface Props {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  fields: string[]
}

export function UnmatchedFieldsAlert(props: Props) {
  const { open, onClose, onConfirm, fields } = props

  const { allowInvalidSubmit, translations } = useRSIContext()
  const cancelRef = useRef<HTMLButtonElement | null>(null)

  return (
    <Dialog.Root
      open={open}
      onOpenChange={({ open }) => {
        if (!open) {
          onClose()
        }
      }}
      initialFocusEl={() => cancelRef.current}
      placement="center"
      role="alertdialog"
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>{translations.alerts.unmatchedRequiredFields.headerTitle}</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            {translations.alerts.unmatchedRequiredFields.bodyText}
            <Box pt={3}>
              <Text display="inline">{translations.alerts.unmatchedRequiredFields.listTitle}</Text>
              <Text display="inline" fontWeight="bold">
                {" "}
                {fields.join(", ")}
              </Text>
            </Box>
          </Dialog.Body>
          <Dialog.Footer>
            <Button ref={cancelRef} onClick={onClose} variant="outline">
              {translations.alerts.unmatchedRequiredFields.cancelButtonTitle}
            </Button>
            {allowInvalidSubmit && (
              <Button colorPalette="red" onClick={onConfirm} ml={3}>
                {translations.alerts.unmatchedRequiredFields.continueButtonTitle}
              </Button>
            )}
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
