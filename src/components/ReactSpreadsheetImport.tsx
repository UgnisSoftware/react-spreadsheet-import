import { Modal, ModalContent, ModalOverlay, extendTheme } from "@chakra-ui/react"
import { ModalCloseButton } from "./ModalCloseButton"
import { Steps } from "./Steps"
import { themeOverrides, colorSchemeOverrides } from "../theme"
import { Providers } from "./Providers"

const theme = extendTheme(colorSchemeOverrides, themeOverrides)

export type Config = {
  // Title of importer modal
  title?: string
}

export type ReactSpreadsheetImportProps = {
  isOpen: boolean
  onClose: () => void
  config: Config
}

export const ReactSpreadsheetImport = (props: ReactSpreadsheetImportProps) => {
  const { isOpen, onClose } = props
  return (
    <Providers theme={theme} rsiValues={props}>
      <Modal isOpen={isOpen} onClose={onClose} id="rsi" variant="rsi" closeOnEsc={false} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalCloseButton onClose={onClose} />
        <ModalContent>
          <Steps />
        </ModalContent>
      </Modal>
    </Providers>
  )
}
