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

export const ConfirmCloseAlert = ({ isOpen, onClose, onConfirm }: Props) => {
  const cancelRef = useRef<HTMLButtonElement | null>(null)

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Exit import flow
          </AlertDialogHeader>

          <AlertDialogBody>Are you sure? Your current information will not be saved.</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} variant="secondary" >
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onConfirm} ml={3}>
              Exit flow
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
