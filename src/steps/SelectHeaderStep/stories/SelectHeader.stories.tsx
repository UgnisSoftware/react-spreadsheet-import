import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react"
import { colorSchemeOverrides, themeOverrides } from "../../../theme"
import { headerSelectionTableFields } from "../../../stories/mockRsiValues"
import { SelectHeaderStep } from "../SelectHeaderStep"
export default {
  title: "Select header",
}

const theme = extendTheme(colorSchemeOverrides, themeOverrides)

export const Table = () => (
  <ChakraProvider theme={theme}>
    <Box display="flex" flexDirection="column" flex={1}>
      <SelectHeaderStep data={headerSelectionTableFields} onContinue={() => {}} onCancel={() => {}} />
    </Box>
  </ChakraProvider>
)
