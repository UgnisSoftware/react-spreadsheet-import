import { chakra } from "@chakra-ui/react"

export const FadingOverlay = chakra("div", {
  base: {
    pos: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "48px",
    pointerEvents: "none",
    bgGradient: "to-b",
    gradientFrom: "backgroundAlpha",
    gradientTo: "background",
  },
})
