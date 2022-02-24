import { UploadStep } from "../UploadStep"
import { theme } from "../../../ReactSpreadsheetImport"
import { mockRsiValues } from "../../../stories/mockRsiValues"
import { Providers } from "../../../components/Providers"
import { Box } from "@chakra-ui/react"

export default {
  title: "Upload Step",
  parameters: {
    layout: "fullscreen",
  },
}

export const Basic = () => {
  return (
    <Providers theme={theme} rsiValues={mockRsiValues}>
      <Box display="flex" flexDirection="column" flex={1} height="100vh" id="chakra-modal-rsi">
        <UploadStep onContinue={() => {}} />
      </Box>
    </Providers>
  )
}
