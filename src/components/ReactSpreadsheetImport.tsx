import { UploadFlow } from "./UploadFlow"
import {
  ChakraProvider,
  Box,
  Modal,
  ModalCloseButton,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react"

type ReactSpreadsheetImportProps = {
  isOpen: boolean
  onClose: () => void
}

export const ReactSpreadsheetImport = ({ isOpen, onClose }: ReactSpreadsheetImportProps) => {
  return (
    <ChakraProvider cssVarsRoot="#chakra-modal-rsi">
      <Modal isOpen={isOpen} onClose={onClose} id={"rsi"} size="full">
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UploadFlow />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  )
}
