import { editableTableInitialData, mockRsiValues } from "../../../stories/mockRsiValues.js"
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

const file = new File([""], "file.csv")

export const Basic = () => (
  <Providers theme={defaultTheme} rsiValues={mockRsiValues}>
    <ModalWrapper isOpen={true} onClose={() => {}}>
      <ValidationStep initialData={editableTableInitialData} file={file} />
    </ModalWrapper>
  </Providers>
)
