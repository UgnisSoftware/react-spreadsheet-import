import { Button, ModalFooter } from "@chakra-ui/react"

type ContinueButtonProps = {
  onContinue: (val: any) => void
  title: string
  isLoading?: boolean
}

export const ContinueButton = ({ onContinue, title, isLoading }: ContinueButtonProps) => (
  <div>
    <Button size="lg" w="21rem" onClick={onContinue} isLoading={isLoading} className={"continue-button"}>
      {title}
    </Button>
  </div>
)
