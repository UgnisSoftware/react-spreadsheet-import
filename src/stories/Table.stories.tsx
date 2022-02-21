import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { colorSchemeOverrides, themeOverrides } from "../theme"
import { editableTableFields, editableTableInitialData } from "./mockRsiValues"
import { ValidationTable } from "../components/ValidationStep/ValidationTable"
export default {
  title: "Validation table",
}

const theme = extendTheme(colorSchemeOverrides, themeOverrides)

export const Table = () => (
  <ChakraProvider theme={theme}>
    <div style={{ blockSize: "calc(100vh - 32px)" }}>
      <ValidationTable fields={editableTableFields} initialData={editableTableInitialData} />
    </div>
  </ChakraProvider>
)
