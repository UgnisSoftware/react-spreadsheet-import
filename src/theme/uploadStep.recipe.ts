import { defineSlotRecipe } from "@chakra-ui/react"

export const uploadStepSlotRecipe = defineSlotRecipe({
  slots: ["title", "subtitle", "tableWrapper", "dropzoneText", "dropZoneBorder", "dropzoneButton"],
  base: {
    title: {
      textStyle: "2xl",
      fontWeight: "semibold",
      color: "textColor",
    },
    subtitle: {
      textStyle: "md",
      color: "subtitleColor",
      mb: "1rem",
    },
    tableWrapper: {
      mb: "0.5rem",
      pos: "relative",
      height: "72px",
    },
    dropzoneText: {
      fontStyle: "lg",
      fontWeight: "semibold",
      color: "textColor",
    },
    dropZoneBorder: {
      bgGradient:
        "repeating-linear(0deg, {colors.rsi.500}, {colors.rsi.500} 10px, transparent 10px, transparent 20px, {colors.rsi.500} 20px), repeating-linear-gradient(90deg, {colors.rsi.500}, {colors.rsi.500} 10px, transparent 10px, transparent 20px, {colors.rsi.500} 20px), repeating-linear-gradient(180deg, {colors.rsi.500}, {colors.rsi.500} 10px, transparent 10px, transparent 20px, {colors.rsi.500} 20px), repeating-linear-gradient(270deg, {colors.rsi.500}, {colors.rsi.500} 10px, transparent 10px, transparent 20px, {colors.rsi.500} 20px)",
      bgSize: "2px 100%, 100% 2px, 2px 100% , 100% 2px",
      bgPos: "0 0, 0 0, 100% 0, 0 100%",
      bgRepeat: "no-repeat",
      rounded: "4px",
    },
    dropzoneButton: {
      mt: "1rem",
    },
  },
})
