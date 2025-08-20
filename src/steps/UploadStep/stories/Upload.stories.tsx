import { ModalWrapper } from "@/components/ModalWrapper"
import { Providers } from "@/components/ui/Providers"
import { mockRsiValues } from "@/stories/mockRsiValues"
import { UploadStep } from "@/steps/UploadStep/UploadStep"

export default {
  title: "Upload Step",
  parameters: {
    layout: "fullscreen",
  },
}

export const Basic = () => {
  return (
    <Providers rsiValues={mockRsiValues}>
      <ModalWrapper isOpen={true} onClose={() => {}}>
        <UploadStep onContinue={async () => {}} />
      </ModalWrapper>
    </Providers>
  )
}
