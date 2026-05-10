import { Dialog } from "@chakra-ui/react"
import { ModalCloseButton } from "@/components/ModalCloseButton"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
}

export const ModalWrapper = ({ children, isOpen, onClose }: Props) => {
  return (
    <Dialog.Root
      id="modal-wrapper"
      open={isOpen}
      onOpenChange={(details) => {
        if (!details.open) {
          onClose()
        }
      }}
      variant="rsi"
      closeOnEscape={false}
      closeOnInteractOutside={false}
      scrollBehavior="inside"
      // React-data-grid do not like the default motion preset
      // as it doensn't calculate the width correctly
      motionPreset="slide-in-bottom"
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger asChild>
            <ModalCloseButton onClose={onClose} />
          </Dialog.CloseTrigger>
          {children}
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
