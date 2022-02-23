import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react"
import { useRef } from "react"

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const EXIT_HEADER_TITLE = "Exit import flow"
const CANCEL_BUTTON = "Cancel"
const EXIT_BUTTON = "Exit flow"

export const ConfirmCloseAlert = ({ isOpen, onClose, onConfirm }: Props) => {
  const cancelRef = useRef<HTMLButtonElement | null>(null)

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef} isCentered>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {EXIT_HEADER_TITLE}
          </AlertDialogHeader>
          <AlertDialogBody>Are you sure? Your current information will not be saved.</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} variant="secondary">
              {CANCEL_BUTTON}
            </Button>
            <Button colorScheme="red" onClick={onConfirm} ml={3}>
              {EXIT_BUTTON}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
