import { extendTheme } from "@chakra-ui/react"
import { Steps } from "./steps/Steps"
import { themeOverrides, colorSchemeOverrides } from "./theme"
import { Providers } from "./components/Providers"
import type { RsiProps } from "./types"
import { ModalWrapper } from "./components/ModalWrapper"

export const theme = extendTheme(colorSchemeOverrides, themeOverrides)

export const ReactSpreadsheetImport = <T extends string>(props: RsiProps<T>) => {
  return (
    <Providers theme={theme} rsiValues={props}>
      <ModalWrapper isOpen={props.isOpen} onClose={props.onClose}>
        <Steps />
      </ModalWrapper>
    </Providers>
  )
}

ReactSpreadsheetImport.defaultProps = {
  autoMapHeaders: true,
  allowInvalidSubmit: true,
  autoMapDistance: 2,
}
