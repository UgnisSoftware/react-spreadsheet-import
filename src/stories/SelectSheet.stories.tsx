import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "../components/ReactSpreadsheetImport"
import { SelectSheet } from "../components/SelectSheet"

export default {
  title: "SelectSheet",
}
const sheetNames = ["Sheet1", "Sheet2", "Sheet3"]

export const Basic = () => (
  <ChakraProvider theme={theme}>
    <SelectSheet sheetNames={sheetNames} onContinue={() => {}} />
  </ChakraProvider>
)
