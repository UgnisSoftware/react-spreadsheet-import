import { useRSIContext } from "@/contexts/RSIContext"
import { Dialog, Button } from "@chakra-ui/react"
import { useRef } from "react"

interface Props {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export const ConfirmCloseAlert = ({ open, onClose, onConfirm }: Props) => {
  const { translations } = useRSIContext()
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
            <Dialog.Title>{translations.alerts.confirmClose.headerTitle}</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>{translations.alerts.confirmClose.bodyText}</Dialog.Body>
          <Dialog.Footer>
            <Button ref={cancelRef} onClick={onClose} variant="outline">
              {translations.alerts.confirmClose.cancelButtonTitle}
            </Button>
            <Button colorPalette="red" onClick={onConfirm} ml={3}>
              {translations.alerts.confirmClose.exitButtonTitle}
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
