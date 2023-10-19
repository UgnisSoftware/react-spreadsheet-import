import { IconButton, useStyleConfig } from "@chakra-ui/react"
import { CgClose } from "react-icons/cg"
import { ConfirmCloseAlert } from "./Alerts/ConfirmCloseAlert"
import { useState } from "react"
import { themeOverrides } from "../theme"

type ModalCloseButtonProps = {
  onClose: () => void
}

export const ModalCloseButton = ({ onClose }: ModalCloseButtonProps) => {
  const [showModal, setShowModal] = useState(false)
  const styles = useStyleConfig("Modal") as (typeof themeOverrides)["components"]["Modal"]["baseStyle"]
  return (
    <>
      <ConfirmCloseAlert
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          setShowModal(false)
          onClose()
        }}
      />
      <IconButton
        right="14px"
        top="20px"
        variant="unstyled"
        sx={styles.closeModalButton}
        aria-label="Close modal"
        icon={<CgClose />}
        color="white"
        position="fixed"
        transform="translate(50%, -50%)"
        onClick={() => setShowModal(true)}
        zIndex="toast"
        dir="ltr"
      />
    </>
  )
}
