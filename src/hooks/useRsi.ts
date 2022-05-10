import { useContext } from "react"
import { RsiContext } from "../components/Providers"
import type { RsiProps } from "../types"
import type { MarkRequired } from "ts-essentials"
import type { defaultRSIProps } from "../ReactSpreadsheetImport"
import type { Translations } from "../translationsRSIProps"

export const useRsi = <T extends string>() =>
  useContext<MarkRequired<RsiProps<T>, keyof typeof defaultRSIProps> & { translations: Translations }>(RsiContext)
