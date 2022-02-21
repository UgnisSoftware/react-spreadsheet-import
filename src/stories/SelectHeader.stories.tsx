import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { colorSchemeOverrides, themeOverrides } from "../theme"
import { headerSelectionTableFields } from "./mockRsiValues"
import { SelectHeaderTable } from "../components/SelectHeaderStep/SelectHeaderTable"
export default {
  title: "Select header table",
}

const theme = extendTheme(colorSchemeOverrides, themeOverrides)

export const Table = () => (
  <ChakraProvider theme={theme}>
    <div style={{ blockSize: "calc(100vh - 32px)" }}>
      <SelectHeaderTable data={headerSelectionTableFields} />
    </div>
  </ChakraProvider>
)
