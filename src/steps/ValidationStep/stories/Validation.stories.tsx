import { editableTableInitialData, mockRsiValues } from "../../../stories/mockRsiValues"
import { ValidationStep } from "../ValidationStep"
import { Providers } from "../../../components/Providers"
import { theme } from "../../../ReactSpreadsheetImport"
import { ModalWrapper } from "../../../components/ModalWrapper"

export default {
  title: "Validation Step",
  parameters: {
    layout: "fullscreen",
  },
}

export const Basic = () => (
  <Providers theme={theme} rsiValues={mockRsiValues}>
    <ModalWrapper isOpen={true} onClose={() => {}}>
      <ValidationStep initialData={editableTableInitialData} />
    </ModalWrapper>
  </Providers>
)
