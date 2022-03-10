import React, { useEffect } from "react"
import { Box, useTheme } from "@chakra-ui/react"
import { usePopper } from "@chakra-ui/popper"

interface PortalProps {
  controlElement: HTMLDivElement | null
  children: React.ReactNode
}

const MenuPortal = (props: PortalProps) => {
  const theme = useTheme()
  const { popperRef, referenceRef } = usePopper({
    strategy: "fixed",
    matchWidth: true,
    flip: false,
  })

  useEffect(() => {
    referenceRef(props.controlElement)
  }, [props.controlElement])

  return (
    <Box ref={popperRef} zIndex={theme.zIndices.tooltip}>
      {props.children}
    </Box>
  )
}

export const customComponents = {
  MenuPortal,
}
