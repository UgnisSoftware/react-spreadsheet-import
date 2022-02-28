import { Button, ModalFooter } from "@chakra-ui/react"

const BUTTON_TITLE = "Next step"

type ContinueButtonProps = {
  onContinue: (val: any) => void
  title?: string
}

export const ContinueButton = ({ onContinue, title = BUTTON_TITLE }: ContinueButtonProps) => (
  <ModalFooter>
    <Button size="lg" w="21rem" onClick={onContinue}>
      {title}
    </Button>
  </ModalFooter>
)
