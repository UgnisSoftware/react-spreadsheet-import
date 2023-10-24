import { Button, ModalFooter } from "@chakra-ui/react"

type ContinueButtonProps = {
  onContinue: (val: any) => void
  onBack: () => void
  title: string
  backTitle: string
  isLoading?: boolean
}

export const ContinueButton = ({ onContinue, onBack, title, backTitle, isLoading }: ContinueButtonProps) => (
  <ModalFooter justifyContent="space-between">
    <Button size="lg" w="21rem" onClick={onBack} isLoading={isLoading}>
      {backTitle}
    </Button>
    <Button size="lg" w="21rem" onClick={onContinue} isLoading={isLoading}>
      {title}
    </Button>
  </ModalFooter>
)
