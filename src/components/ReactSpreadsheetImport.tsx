import {
  ChakraProvider,
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalFooter,
  Button,
  ModalOverlay,
  IconButton,
  extendTheme,
} from "@chakra-ui/react"
import { CgClose } from "react-icons/cg"
import { UploadFlow } from "./UploadFlow"

type ReactSpreadsheetImportProps = {
  isOpen: boolean
  onClose: () => void
}

const overrides = {
  shadows: {
    outline: 0,
  },
  components: {
    Modal: {
      variants: {
        rsi: {
          dialog: {
            minH: "calc(100vh - 4rem)",
            maxW: "calc(100vw - 4rem)",
            my: "2rem",
            xy: "2rem",
            borderRadius: "3xl",
          },
        },
      },
    },
  },
}

const theme = extendTheme(overrides)

export const ReactSpreadsheetImport = ({ isOpen, onClose }: ReactSpreadsheetImportProps) => {
  return (
    <ChakraProvider>
      {/* Needed to override RSI theme but not the rest of chakra theme */}
      <ChakraProvider cssVarsRoot="#chakra-modal-rsi" theme={theme}>
        <Modal isOpen={isOpen} onClose={onClose} id="rsi" variant="rsi" closeOnEsc={false} closeOnOverlayClick={false}>
          <ModalOverlay />
          <ModalContent>
            <IconButton
              variant="unstyled"
              aria-label="Close modal"
              icon={<CgClose />}
              color="white"
              position="absolute"
              transform="translate(50%, -50%)"
              right="-22px"
              top="-8px"
              onClick={onClose}
            />
            <ModalHeader>Modal Title</ModalHeader>
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
