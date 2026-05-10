import { type PropsWithChildren, createContext, useContext, useMemo } from "react"

import type { RsiProps } from "@/types"
import { once } from "@/utils"
import type { MarkRequired } from "ts-essentials"
import { defaultRSIProps } from "@/ReactSpreadsheetImport"

export type RSIContextContextValue<T extends string> = MarkRequired<
  RsiProps<T>,
  keyof typeof defaultRSIProps | "translations"
>

const createRSIContextContext = once(<T extends string>() => createContext<RSIContextContextValue<T> | null>(null))

type RSIContextProviderProps<T extends string> = PropsWithChildren<{
  rsiValues: RSIContextContextValue<T>
}>

export function RSIContextProvider<T extends string>(props: RSIContextProviderProps<T>) {
  const { children, rsiValues } = props

  const RSIContextContext = useMemo(() => createRSIContextContext<T>(), [])

  if (!rsiValues.fields) {
    throw new Error("Fields must be provided to react-spreadsheet-import")
  }

  return <RSIContextContext.Provider value={rsiValues}>{children}</RSIContextContext.Provider>
}

export function useRSIContext<T extends string>() {
  const context = useContext(createRSIContextContext<T>())
  if (!context) {
    throw new Error("useRSIContext must be used within a RSIContextProvider")
  }
  return context
}
