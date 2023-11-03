import { useContext } from "react"
import { RsiContext } from "../components/Providers"
import type { RsiProps } from "../types.js"
import type { MarkRequired } from "ts-essentials"
import type { defaultRSIProps } from "../ReactSpreadsheetImport"
import type { Translations } from "../translationsRSIProps.js"

export const useRsi = <T extends string>() =>
  useContext<MarkRequired<RsiProps<T>, keyof typeof defaultRSIProps> & { translations: Translations }>(RsiContext)
