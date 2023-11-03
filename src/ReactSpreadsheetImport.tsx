import merge from "lodash/merge"

import { Steps } from "./steps/Steps"
import { rtlThemeSupport, themeOverrides } from "./theme.js"
import { Providers } from "./components/Providers"
import type { RsiProps } from "./types.js"
import { ModalWrapper } from "./components/ModalWrapper"
import { translations } from "./translationsRSIProps.js"

export const defaultTheme = themeOverrides

export const defaultRSIProps: Partial<RsiProps<any>> = {
  autoMapHeaders: true,
  allowInvalidSubmit: true,
  autoMapDistance: 2,
  translations: translations,
  uploadStepHook: async (value) => value,
  selectHeaderStepHook: async (headerValues, data) => ({ headerValues, data }),
  matchColumnsStepHook: async (table) => table,
  dateFormat: "yyyy-mm-dd", // ISO 8601,
  parseRaw: true,
} as const

export const ReactSpreadsheetImport = <T extends string>(props: RsiProps<T>) => {
  const mergedTranslations =
    props.translations !== translations ? merge(translations, props.translations) : translations
  const mergedThemes = props.rtl
    ? merge(defaultTheme, rtlThemeSupport, props.customTheme)
    : merge(defaultTheme, props.customTheme)

  return (
    <Providers theme={mergedThemes} rsiValues={{ ...props, translations: mergedTranslations }}>
      <ModalWrapper isOpen={props.isOpen} onClose={props.onClose}>
        <Steps />
      </ModalWrapper>
    </Providers>
  )
}

ReactSpreadsheetImport.defaultProps = defaultRSIProps
