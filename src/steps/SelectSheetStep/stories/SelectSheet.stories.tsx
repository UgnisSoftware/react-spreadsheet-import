import { ModalWrapper } from "@/components/ModalWrapper"
import { Providers } from "@/components/ui/Providers"
import { mockRsiValues } from "@/stories/mockRsiValues"
import { SelectSheetStep } from "@/steps/SelectSheetStep/SelectSheetStep"

export default {
  title: "Select Sheet Step",
  parameters: {
    layout: "fullscreen",
  },
}

const sheetNames = ["Sheet1", "Sheet2", "Sheet3"]

export const Basic = () => (
  <Providers rsiValues={mockRsiValues}>
    <ModalWrapper isOpen={true} onClose={() => {}}>
      <SelectSheetStep sheetNames={sheetNames} onContinue={async () => {}} />
    </ModalWrapper>
  </Providers>
)
