import { ChakraProvider, Modal, ModalContent, ModalOverlay, extendTheme } from "@chakra-ui/react"
import { ModalCloseButton } from "./ModalCloseButton"
import { Steps } from "./Steps"
import { themeOverrides, colorSchemeOverrides } from "../theme"

const theme = extendTheme(colorSchemeOverrides, themeOverrides)

type ReactSpreadsheetImportProps = {
  isOpen: boolean
  onClose: () => void
}

export const ReactSpreadsheetImport = ({ isOpen, onClose }: ReactSpreadsheetImportProps) => {
  return (
    <ChakraProvider>
      {/* cssVarsRoot used to override RSI theme but not the rest of chakra theme */}
      <ChakraProvider cssVarsRoot="#chakra-modal-rsi" theme={theme}>
        <Modal isOpen={isOpen} onClose={onClose} id="rsi" variant="rsi" closeOnEsc={false} closeOnOverlayClick={false}>
          <ModalOverlay />
          <ModalCloseButton onClose={onClose} />
          <ModalContent>
            <Steps />
          </ModalContent>
        </Modal>
      </ChakraProvider>
    </ChakraProvider>
  )
}
