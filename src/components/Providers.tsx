import { ChakraProvider, CSSObject } from "@chakra-ui/react"
import { createContext } from "react"
import type { ReactSpreadsheetImportProps } from "./ReactSpreadsheetImport"

export const RsiContext = createContext({} as ReactSpreadsheetImportProps)

type ProvidersProps = {
  children: React.ReactNode
  theme: CSSObject
  rsiValues: ReactSpreadsheetImportProps
}

export const Providers = ({ children, theme, rsiValues }: ProvidersProps) => (
  <RsiContext.Provider value={rsiValues}>
    <ChakraProvider>
      {/* cssVarsRoot used to override RSI theme but not the rest of chakra theme */}
      <ChakraProvider cssVarsRoot="#chakra-modal-rsi" theme={theme}>
        {children}
      </ChakraProvider>
    </ChakraProvider>
  </RsiContext.Provider>
)
