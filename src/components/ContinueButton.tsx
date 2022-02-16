import { Button, Flex } from "@chakra-ui/react"

const BUTTON_TITLE = "Next step"

type ContinueButtonProps = {
  onContinue: (val: unknown) => void
}

export const ContinueButton = ({ onContinue }: ContinueButtonProps) => (
  <Flex bg="gray.100" paddingY="1.5rem" justifyContent="center">
    <Button size="lg" w="21rem" onClick={onContinue}>
      {BUTTON_TITLE}
    </Button>
  </Flex>
)
