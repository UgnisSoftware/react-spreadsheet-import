import { Box } from "@chakra-ui/react"
import { editableTableInitialData, mockRsiValues } from "../../../stories/mockRsiValues"
import { ValidationStep } from "../ValidationStep"
import { Providers } from "../../../components/Providers"
import { theme } from "../../../ReactSpreadsheetImport"

export default {
  title: "Validation Step",
  parameters: {
    layout: "fullscreen",
  },
}

export const Basic = () => (
  <Providers theme={theme} rsiValues={mockRsiValues}>
    <Box display="flex" flexDirection="column" flex={1} height="100vh" id="chakra-modal-rsi">
      <ValidationStep initialData={editableTableInitialData} onSubmit={() => {}} />
    </Box>
  </Providers>
)
