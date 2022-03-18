import React, { useEffect } from "react"
import ReactDOM from "react-dom"
import { Box, useTheme } from "@chakra-ui/react"
import { usePopper } from "@chakra-ui/popper"
import { rootId } from "../Providers"

interface PortalProps {
  controlElement: HTMLDivElement | null
  children: React.ReactNode
}

const MenuPortal = (props: PortalProps) => {
  const theme = useTheme()
  const { popperRef, referenceRef } = usePopper({
    strategy: "fixed",
    matchWidth: true,
  })

  useEffect(() => {
    referenceRef(props.controlElement)
  }, [props.controlElement])

  return ReactDOM.createPortal(
    <Box
      ref={popperRef}
      zIndex={theme.zIndices.tooltip}
      sx={{
        "&[data-popper-reference-hidden]": {
          visibility: "hidden",
          pointerEvents: "none",
        },
      }}
      id={rootId}
    >
      {props.children}
    </Box>,
    document.body,
  )
}

export const customComponents = {
  MenuPortal,
}
