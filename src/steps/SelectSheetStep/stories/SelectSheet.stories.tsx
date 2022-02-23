import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "../../../ReactSpreadsheetImport"
import { SelectSheetStep } from "../SelectSheetStep"

export default {
  title: "SelectSheet",
}
const sheetNames = ["Sheet1", "Sheet2", "Sheet3"]

export const Basic = () => (
  <ChakraProvider theme={theme}>
    <SelectSheetStep sheetNames={sheetNames} onContinue={() => {}} />
  </ChakraProvider>
)
