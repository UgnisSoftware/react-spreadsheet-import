import { defineSlotRecipe } from "@chakra-ui/react"
import { dialogAnatomy } from "@chakra-ui/react/anatomy"

export const dialogSlotRecipe = defineSlotRecipe({
  slots: [...dialogAnatomy.keys(), "closeModalButton", "backButton", "continueButton"],
  base: {
    closeModalButton: {},
    backButton: {
      gridColumn: "1",
      gridRow: "1",
      justifySelf: "start",
    },
    continueButton: {
      gridColumn: "1 / 3",
      gridRow: "1",
      justifySelf: "center",
    },
  },
  variants: {
    variant: {
      rsi: {
        header: {
          bg: "secondaryBackground",
          px: "2rem",
          py: "1.5rem",
        },
        body: {
          bg: "background",
          display: "flex",
          paddingX: "2rem",
          paddingY: "2rem",
          flexDirection: "column",
          flex: 1,
          overflow: "auto",
          height: "100%",
        },
        footer: {
          bg: "secondaryBackground",
          py: "1.5rem",
          px: "2rem",
          justifyContent: "center",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr",
          gap: "1rem",
        },
        content: {
          outline: "unset",
          minH: "calc(var(--chakra-vh) - 4rem)",
          maxW: "calc(var(--chakra-vw) - 4rem)",
          "--dialog-margin": "0",
          my: "2rem",
          borderRadius: "3xl",
          overflow: "hidden",
        },
      },
    },
  },
})
