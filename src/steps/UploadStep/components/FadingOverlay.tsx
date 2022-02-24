import { Box } from "@chakra-ui/react"
import React from "react"

export const FadingOverlay = () => (
  <Box
    position="absolute"
    left={0}
    right={0}
    bottom={0}
    height="48px"
    pointerEvents="none"
    bg="linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))"
  />
)
