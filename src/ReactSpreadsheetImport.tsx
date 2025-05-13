import type { ReactNode } from "react"
import { createContext } from "react"
import { translations } from "./translationsRSIProps.ts"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "./components/ui/dialog.tsx"
import { merge } from "lodash"


export const RsiContext = createContext({} as any)

export const defaultRSIProps = { //todo fix type
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

export const ReactSpreadsheetImport = <T extends string>(propsWithoutDefaults: {value: any, children: ReactNode}) => {
  const props = merge({}, defaultRSIProps, propsWithoutDefaults)
  const mergedTranslations =
    props.translations !== translations ? merge(translations, props.translations) : translations
  return (
    <RsiContext.Provider value={{ ...props, translations: mergedTranslations }}>
      <Dialog>
        <DialogTrigger asChild>
          {props.children}
        </DialogTrigger>
        <DialogContent className='
            rounded-[24px]
            max-w-[calc(100%-64px)]
            sm:max-w-[calc(100%-64px)]
            h-[calc(100%-64px)]
            m-8
            inset-0
            top-0
            left-0
            translate-x-0
            translate-y-0'>
          {/*<Steps/>*/}
          hi
        </DialogContent>
      </Dialog>
    </RsiContext.Provider>
  )
}
