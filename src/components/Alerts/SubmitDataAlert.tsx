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
import { useRsi } from "../../hooks/useRsi"

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const SUBMIT_HEADER_TITLE = "Errors detected"
const SUBMIT_BODY_TEXT =
  "There are still some rows that contain errors. Rows with errors will be ignored when submitting."
const SUBMIT_FORBIDDEN_BODY_TEXT = "There are still some rows containing errors."
const CANCEL_BUTTON = "Cancel"
const FINISH_BUTTON = "Submit"

export const SubmitDataAlert = ({ isOpen, onClose, onConfirm }: Props) => {
  const { allowInvalidSubmit } = useRsi()
  const cancelRef = useRef<HTMLButtonElement | null>(null)

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef} isCentered id="rsi">
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {SUBMIT_HEADER_TITLE}
          </AlertDialogHeader>
          <AlertDialogBody>{allowInvalidSubmit ? SUBMIT_BODY_TEXT : SUBMIT_FORBIDDEN_BODY_TEXT}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} variant="secondary">
              {CANCEL_BUTTON}
            </Button>
            {allowInvalidSubmit && (
              <Button onClick={onConfirm} ml={3}>
                {FINISH_BUTTON}
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
