import { defineSlotRecipe } from "@chakra-ui/react"
import { stepsAnatomy } from "@chakra-ui/react/anatomy"

export const stepsSlotRecipe = defineSlotRecipe({
  slots: stepsAnatomy.keys(),
  variants: {
    variant: {
      rsi: {
        title: {
          fontSize: "md",
          color: "textColor",
          _current: {
            color: "red",
          },
        },
        separator: {
          bg: "white",
          _complete: {
            bg: "green.solid",
          },
        },
        indicator: {
          _incomplete: {
            borderWidth: "var(--steps-thickness)",
            borderColor: "white",
            bg: "white",
          },
          _current: {
            bg: "white",
            borderWidth: "var(--steps-thickness)",
            borderColor: "green.solid",
            fontWeight: "bold",
            color: "textColor",
          },
          _complete: {
            bg: "green.solid",
            borderColor: "green.solid",
            color: "green.contrast",
          },
        },
      },
    },
  },
})
