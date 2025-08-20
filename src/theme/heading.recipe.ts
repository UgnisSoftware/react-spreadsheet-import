import { defineRecipe } from "@chakra-ui/react"

export const headingRecipe = defineRecipe({
  variants: {
    variant: {
      rsi: {
        fontSize: "3xl",
        color: "textColor",
        mb: 8,
      },
    },
  },
})
