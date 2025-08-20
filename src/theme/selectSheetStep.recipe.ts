import { defineSlotRecipe } from "@chakra-ui/react"

export const selectSheetStep = defineSlotRecipe({
  slots: ["radio", "radioLabel"],
  base: {
    radio: {},
    radioLabel: {
      color: "textColor",
    },
  },
})
