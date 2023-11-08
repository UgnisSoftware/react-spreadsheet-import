import { Button, ModalFooter, useStyleConfig } from "@chakra-ui/react"
import { themeOverrides } from "../theme"

type ContinueButtonProps = {
  onContinue: (val: any) => void
  onBack?: () => void
  title: string
  backTitle?: string
  isLoading?: boolean
}

export const ContinueButton = ({ onContinue, onBack, title, backTitle, isLoading }: ContinueButtonProps) => {
  const styles = useStyleConfig("Modal") as (typeof themeOverrides)["components"]["Modal"]["baseStyle"]
  return (
    <ModalFooter justifyContent={onBack && "space-between"}>
      {onBack && (
        <Button size="lg" w="21rem" sx={styles.backButton} onClick={onBack} isLoading={isLoading}>
          {backTitle}
        </Button>
      )}
      <Button size="lg" w="21rem" sx={styles.continueButton} onClick={onContinue} isLoading={isLoading}>
        {title}
      </Button>
    </ModalFooter>
  )
}
