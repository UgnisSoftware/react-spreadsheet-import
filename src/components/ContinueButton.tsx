import { Button, Dialog, useSlotRecipe } from "@chakra-ui/react"

type ContinueButtonProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onContinue: (val: any) => void
  onBack?: () => void
  title: string
  backTitle?: string
  isLoading?: boolean
}

export const ContinueButton = ({ onContinue, onBack, title, backTitle, isLoading }: ContinueButtonProps) => {
  const recipe = useSlotRecipe({ key: "dialog" })
  const styles = recipe()

  const nextButtonMobileWidth = onBack ? "8rem" : "100%"
  return (
    <Dialog.Footer>
      {onBack && (
        // TODO: use link variant for back button
        <Button size="md" css={styles.backButton} onClick={onBack} loading={isLoading} variant="ghost">
          {backTitle}
        </Button>
      )}
      <Button
        size="lg"
        w={{ base: nextButtonMobileWidth, md: "21rem" }}
        css={styles.continueButton}
        onClick={onContinue}
        loading={isLoading}
      >
        {title}
      </Button>
    </Dialog.Footer>
  )
}
