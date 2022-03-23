import type React from "react"
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react"
import { ModalCloseButton } from "./ModalCloseButton"

type Props = {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

export const ModalWrapper = ({ children, isOpen, onClose }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      id="rsi"
      variant="rsi"
      closeOnEsc={false}
      closeOnOverlayClick={false}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalCloseButton onClose={onClose} />
      <ModalContent>{children}</ModalContent>
    </Modal>
  )
}
