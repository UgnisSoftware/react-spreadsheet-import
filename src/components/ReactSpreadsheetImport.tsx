import { UploadFlow } from "./UploadFlow"
import {
  ChakraProvider,
  Modal,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalFooter,
  Button,
  ModalOverlay,
  useTheme,
} from "@chakra-ui/react"

type ReactSpreadsheetImportProps = {
  isOpen: boolean
  onClose: () => void
}

export const ReactSpreadsheetImport = ({ isOpen, onClose }: ReactSpreadsheetImportProps) => {
  return (
    <ChakraProvider>
      {/* Needed to override RSI theme but not the rest of chakra theme */}
      <ChakraProvider cssVarsRoot="#chakra-modal-rsi">
        <Modal isOpen={isOpen} onClose={onClose} id="rsi" size="6xl" closeOnEsc={false} closeOnOverlayClick={false}>
          <ModalOverlay />
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
    </ChakraProvider>
  )
}
