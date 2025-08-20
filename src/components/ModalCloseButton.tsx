import { IconButton, useSlotRecipe } from "@chakra-ui/react"
import { CgClose } from "react-icons/cg"
import { useState } from "react"
import { ConfirmCloseAlert } from "@/components/Alerts/ConfirmCloseAlert"

type ModalCloseButtonProps = {
  onClose: () => void
}

export const ModalCloseButton = ({ onClose }: ModalCloseButtonProps) => {
  const [showModal, setShowModal] = useState(false)
  const recipe = useSlotRecipe({ key: "dialog" })
  const styles = recipe()
  return (
    <>
      <ConfirmCloseAlert
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          setShowModal(false)
          onClose()
        }}
      />
      <IconButton
        right="14px"
        top="20px"
        unstyled
        css={styles.closeModalButton}
        aria-label="Close modal"
        color="white"
        position="fixed"
        transform="translate(50%, -50%)"
        onClick={() => setShowModal(true)}
        zIndex="toast"
        dir="ltr"
      >
        <CgClose />
      </IconButton>
    </>
  )
}
