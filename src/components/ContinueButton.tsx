import { Button, ModalFooter } from "@chakra-ui/react"

type ContinueButtonProps = {
  onContinue: (val: any) => void
  title: string
}

export const ContinueButton = ({ onContinue, title }: ContinueButtonProps) => (
  <ModalFooter>
    <Button size="lg" w="21rem" onClick={onContinue}>
      {title}
    </Button>
  </ModalFooter>
)
