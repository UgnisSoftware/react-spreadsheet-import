import { UploadStep } from "../UploadStep"
import { theme } from "../../../ReactSpreadsheetImport"
import { mockRsiValues } from "../../../stories/mockRsiValues"
import { Providers } from "../../../components/Providers"
import { ModalWrapper } from "../../../components/ModalWrapper"

export default {
  title: "Upload Step",
  parameters: {
    layout: "fullscreen",
  },
}

export const Basic = () => {
  return (
    <Providers theme={theme} rsiValues={mockRsiValues}>
      <ModalWrapper isOpen={true} onClose={() => {}}>
        <UploadStep onContinue={() => {}} />
      </ModalWrapper>
    </Providers>
  )
}
