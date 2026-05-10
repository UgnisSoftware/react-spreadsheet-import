import { ModalWrapper } from "@/components/ModalWrapper"
import { Providers } from "@/components/ui/Providers"
import { headerSelectionTableFields, mockRsiValues } from "@/stories/mockRsiValues"
import { SelectHeaderStep } from "@/steps/SelectHeaderStep/SelectHeaderStep"

export default {
  title: "Select Header Step",
  parameters: {
    layout: "fullscreen",
  },
}

export const Basic = () => (
  <Providers rsiValues={mockRsiValues}>
    <ModalWrapper isOpen={true} onClose={() => {}}>
      <SelectHeaderStep data={headerSelectionTableFields} onContinue={async () => {}} />
    </ModalWrapper>
  </Providers>
)
