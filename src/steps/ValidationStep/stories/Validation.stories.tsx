import { editableTableInitialData, mockRsiValues } from "../../../stories/mockRsiValues"
import { ValidationStep } from "../ValidationStep"
import { Providers } from "../../../components/Providers"
import { defaultTheme } from "../../../ReactSpreadsheetImport"
import { ModalWrapper } from "../../../components/ModalWrapper"
import { addErrorsAndRunHooks } from "../utils/dataMutations"

export default {
  title: "Validation Step",
  parameters: {
    layout: "fullscreen",
  },
}

const file = new File([""], "file.csv")
const data = await addErrorsAndRunHooks(editableTableInitialData, mockRsiValues.fields)

export const Basic = () => {
  return (
    <Providers theme={defaultTheme} rsiValues={mockRsiValues}>
      <ModalWrapper isOpen={true} onClose={() => {}}>
        <ValidationStep initialData={data} file={file} />
      </ModalWrapper>
    </Providers>
  )
}
