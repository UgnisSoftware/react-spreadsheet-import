import { Button, Flex } from "@chakra-ui/react"

const BUTTON_TITLE = "Next step"

type ContinueButtonProps = {
  onContinue: (val: unknown) => void
  title?: string
}

export const ContinueButton = ({ onContinue, title = BUTTON_TITLE }: ContinueButtonProps) => (
  <Flex bg="gray.100" paddingY="1.5rem" justifyContent="center">
    <Button size="lg" w="21rem" onClick={onContinue}>
      {title}
    </Button>
  </Flex>
)
