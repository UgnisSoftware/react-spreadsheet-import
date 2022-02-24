import { Box } from "@chakra-ui/react"
import { theme } from "../../../ReactSpreadsheetImport"
import { SelectSheetStep } from "../SelectSheetStep"
import { mockRsiValues } from "../../../stories/mockRsiValues"
import { Providers } from "../../../components/Providers"

export default {
  title: "Select Sheet Step",
  parameters: {
    layout: "fullscreen",
  },
}

const sheetNames = ["Sheet1", "Sheet2", "Sheet3"]

export const Basic = () => (
  <Providers theme={theme} rsiValues={mockRsiValues}>
    <Box display="flex" flexDirection="column" flex={1} height="100vh" id="chakra-modal-rsi">
      <SelectSheetStep sheetNames={sheetNames} onContinue={() => {}} />
    </Box>
  </Providers>
)
