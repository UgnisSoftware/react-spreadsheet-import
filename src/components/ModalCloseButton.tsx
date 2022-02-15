import { IconButton } from "@chakra-ui/react"
import { CgClose } from "react-icons/cg"

type ModalCloseButtonProps = {
  onClose: () => void
}

export const ModalCloseButton = ({ onClose }: ModalCloseButtonProps) => (
  <IconButton
    variant="unstyled"
    aria-label="Close modal"
    icon={<CgClose />}
    color="white"
    position="absolute"
    transform="translate(50%, -50%)"
    right="14px"
    top="20px"
    onClick={onClose}
    zIndex="toast"
  />
)
