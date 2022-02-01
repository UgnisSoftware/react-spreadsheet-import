import { UploadFlow } from "./UploadFlow"
import { ChakraProvider, Box } from "@chakra-ui/react"

export const ReactSpreadsheetImport = () => (
  <Box id="ReactSpreadsheetImport">
    <ChakraProvider cssVarsRoot="#ReactSpreadsheetImport">
      <UploadFlow />
    </ChakraProvider>
  </Box>
)
