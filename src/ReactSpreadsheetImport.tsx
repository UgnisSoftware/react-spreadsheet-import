import merge from "lodash.merge"

import { ModalWrapper } from "@/components/ModalWrapper"
import { Providers } from "@/components/ui/Providers"
import { Steps } from "@/steps/Steps"
import { translations } from "@/translations"
import type { RsiProps } from "@/types"
import { RSIContextContextValue } from "@/contexts/RSIContext"

type DefaultRSIProps =
  | "autoMapHeaders"
  | "autoMapSelectValues"
  | "allowInvalidSubmit"
  | "autoMapDistance"
  | "isNavigationEnabled"
  | "translations"
  | "uploadStepHook"
  | "selectHeaderStepHook"
  | "matchColumnsStepHook"
  | "dateFormat"
  | "parseRaw"

export const defaultRSIProps: Pick<RsiProps<string>, DefaultRSIProps> = {
  autoMapHeaders: true,
  autoMapSelectValues: false,
  allowInvalidSubmit: true,
  autoMapDistance: 2,
  isNavigationEnabled: false,
  translations: translations,
  uploadStepHook: async (value) => value,
  selectHeaderStepHook: async (headerValues, data) => ({ headerValues, data }),
  matchColumnsStepHook: async (table) => table,
  dateFormat: "yyyy-mm-dd", // ISO 8601,
  parseRaw: true,
} as const

export function ReactSpreadsheetImport<T extends string>(propsWithoutDefaults: RsiProps<T>) {
  const props = merge({}, defaultRSIProps, propsWithoutDefaults)
  const mergedTranslations =
    props.translations !== translations ? merge(translations, props.translations) : translations

  return (
    <Providers rsiValues={{ ...props, translations: mergedTranslations } as RSIContextContextValue<T>}>
      <ModalWrapper isOpen={props.isOpen} onClose={props.onClose}>
        <Steps />
      </ModalWrapper>
    </Providers>
  )
}
