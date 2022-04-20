import { defaultTheme } from "../../../ReactSpreadsheetImport"
import { SelectSheetStep } from "../SelectSheetStep"
import { mockRsiValues } from "../../../stories/mockRsiValues"
import { Providers } from "../../../components/Providers"
import { ModalWrapper } from "../../../components/ModalWrapper"

export default {
  title: "Select Sheet Step",
  parameters: {
    layout: "fullscreen",
  },
}

const sheetNames = ["Sheet1", "Sheet2", "Sheet3"]

export const Basic = () => (
  <Providers theme={defaultTheme} rsiValues={mockRsiValues}>
    <ModalWrapper isOpen={true} onClose={() => {}}>
      <SelectSheetStep sheetNames={sheetNames} onContinue={async () => {}} />
    </ModalWrapper>
  </Providers>
)
