import { defineSlotRecipe } from "@chakra-ui/react"

export const matchColumnsStepSlotRecipe = defineSlotRecipe({
  slots: [
    "title",
    "subtitle",
    "userTableHeader",
    "userTableCell",
    "userTableIgnoreButton",
    "selectColumnText",
    "selectColumnAccordionLabel",
    "selectColumnSelectLabel",
  ],
  base: {
    title: {
      textStyle: "2xl",
      fontWeight: "semibold",
      color: "textColor",
      mb: 4,
    },
    subtitle: {
      textStyle: "md",
      color: "subtitleColor",
      mb: "1rem",
    },
    userTableHeader: {
      textStyle: "xs",
      fontWeight: "bold",
      letterSpacing: "wider",
      color: "textColor",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      ["&[data-ignored]"]: {
        color: "inactiveColor",
      },
    },
    userTableCell: {
      textStyle: "sm",
      fontWeight: "medium",
      color: "textColor",
      px: 6,
      py: 4,
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      ["&[data-ignored]"]: {
        color: "inactiveColor",
      },
    },
    userTableIgnoreButton: {
      colorScheme: "gray",
      color: "textColor",
    },
    selectColumnText: {
      textStyle: "sm",
      fontWeight: "normal",
      color: "inactiveColor",
      px: 4,
    },
    selectColumnAccordionLabel: {
      color: "blue.600",
      textStyle: "sm",
      pl: 1,
    },
    selectColumnSelectLabel: {
      pt: "0.375rem",
      pb: 2,
      textStyle: "md",
      fontWeight: "medium",
      color: "textColor",
    },
  },
})
