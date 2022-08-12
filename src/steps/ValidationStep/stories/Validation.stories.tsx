import { editableTableInitialData, mockRsiValues } from "../../../stories/mockRsiValues"
import { ValidationStep } from "../ValidationStep"
import { Providers } from "../../../components/Providers"
import { defaultTheme } from "../../../ReactSpreadsheetImport"
import { ModalWrapper } from "../../../components/ModalWrapper"

export default {
  title: "Validation Step",
  parameters: {
    layout: "fullscreen",
  },
}

export const Basic = () => (
  <Providers theme={defaultTheme} rsiValues={mockRsiValues}>
      <ValidationStep initialData={editableTableInitialData} />
  </Providers>
)
