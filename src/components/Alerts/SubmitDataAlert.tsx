import { useRSIContext } from "@/contexts/RSIContext"
import { Dialog, Button } from "@chakra-ui/react"
import { useRef } from "react"

interface Props {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export function SubmitDataAlert(props: Props) {
  const { open, onClose, onConfirm } = props

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
            <Dialog.Title>{translations.alerts.submitIncomplete.headerTitle}</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            {" "}
            {allowInvalidSubmit
              ? translations.alerts.submitIncomplete.bodyText
              : translations.alerts.submitIncomplete.bodyTextSubmitForbidden}
          </Dialog.Body>
          <Dialog.Footer>
            <Button ref={cancelRef} onClick={onClose} variant="outline">
              {translations.alerts.submitIncomplete.cancelButtonTitle}
            </Button>
            {allowInvalidSubmit && (
              <Button colorPalette="red" onClick={onConfirm} ml={3}>
                {translations.alerts.submitIncomplete.finishButtonTitle}
              </Button>
            )}
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
