import { headerSelectionTableFields, mockRsiValues } from "../../../stories/mockRsiValues"
import { SelectHeaderStep } from "../SelectHeaderStep"
import { Providers } from "../../../components/Providers"
import { ModalWrapper } from "../../../components/ModalWrapper"
import { theme } from "../../../ReactSpreadsheetImport"
export default {
  title: "Select Header Step",
  parameters: {
    layout: "fullscreen",
  },
}

export const Basic = () => (
  <Providers theme={theme} rsiValues={mockRsiValues}>
    <ModalWrapper isOpen={true} onClose={() => {}}>
      <SelectHeaderStep data={headerSelectionTableFields} onContinue={() => {}} />
    </ModalWrapper>
  </Providers>
)
