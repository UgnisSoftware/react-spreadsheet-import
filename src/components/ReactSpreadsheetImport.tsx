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

export const ReactSpreadsheetImport = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <ChakraProvider cssVarsRoot="#chakra-modal-something">
        <Modal isOpen={isOpen} onClose={onClose} id={"something"} size="full">
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
    </>
  )
}
