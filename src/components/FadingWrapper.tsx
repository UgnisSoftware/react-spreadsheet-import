import { Box } from "@chakra-ui/react"
import React from "react"

type FadingWrapperProps = {
  gridColumn: string
  gridRow: string
}

export const FadingWrapper = ({ gridColumn, gridRow }: FadingWrapperProps) => (
  <>
    <Box gridColumn={gridColumn} gridRow={gridRow} borderRadius="1.2rem" border="1px solid" borderColor="gray.200" />
    <Box
      gridColumn={gridColumn}
      gridRow={gridRow}
      bg="linear-gradient(rgba(255, 255, 255, 0), 90%, rgba(255, 255, 255, 1))"
    />
  </>
)
