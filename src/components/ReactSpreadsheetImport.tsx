import { Modal, ModalContent, ModalOverlay, extendTheme } from "@chakra-ui/react"
import { ModalCloseButton } from "./ModalCloseButton"
import { Steps } from "./Steps"
import { themeOverrides, colorSchemeOverrides } from "../theme"
import { Providers } from "./Providers"
import type { RsiProps } from "../types"

export const theme = extendTheme(colorSchemeOverrides, themeOverrides)

export const ReactSpreadsheetImport = (props: RsiProps) => {
  const { isOpen, onClose } = props
  return (
    <Providers theme={theme} rsiValues={props}>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        id="rsi"
        variant="rsi"
        closeOnEsc={false}
        closeOnOverlayClick={false}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalCloseButton onClose={onClose} />
        <ModalContent>
          <Steps />
        </ModalContent>
      </Modal>
    </Providers>
  )
}
