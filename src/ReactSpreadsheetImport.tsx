import { extendTheme } from "@chakra-ui/react"
import merge from "lodash/merge"

import { Steps } from "./steps/Steps"
import { themeOverrides, colorSchemeOverrides } from "./theme"
import { Providers } from "./components/Providers"
import type { RsiProps } from "./types"
import { ModalWrapper } from "./components/ModalWrapper"
import { translations } from "./translationsRSIProps"

export const theme = extendTheme(colorSchemeOverrides, themeOverrides)

export const defaultRSIProps: Partial<RsiProps<any>> = {
  autoMapHeaders: true,
  allowInvalidSubmit: true,
  autoMapDistance: 2,
  translations: translations,
} as const

export const ReactSpreadsheetImport = <T extends string>(props: RsiProps<T>) => {
  const mergedTranslations =
    props.translations !== translations ? merge(translations, props.translations) : translations

  return (
    <Providers theme={theme} rsiValues={{ ...props, translations: mergedTranslations }}>
      <ModalWrapper isOpen={props.isOpen} onClose={props.onClose}>
        <Steps />
      </ModalWrapper>
    </Providers>
  )
}

ReactSpreadsheetImport.defaultProps = defaultRSIProps
