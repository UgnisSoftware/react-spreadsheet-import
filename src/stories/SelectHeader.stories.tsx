import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react"
import { colorSchemeOverrides, themeOverrides } from "../theme"
import { headerSelectionTableFields } from "./mockRsiValues"
import { SelectHeader } from "../components/SelectHeaderStep/SelectHeader"
export default {
  title: "Select header",
}

const theme = extendTheme(colorSchemeOverrides, themeOverrides)

export const Table = () => (
  <ChakraProvider theme={theme}>
    <Box display="flex" flexDirection="column" flex={1}>
      <SelectHeader data={headerSelectionTableFields} onContinue={() => {}} onCancel={() => {}} />
    </Box>
  </ChakraProvider>
)
