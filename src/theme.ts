import { StepsStyleConfig } from "chakra-ui-steps"
import { darken, lighten, mode } from "@chakra-ui/theme-tools"
import type { CSSObject } from "@chakra-ui/react"

type CSSObjectWithActiveStep = CSSObject & { _activeStep: CSSObject }

export const themeOverrides = {
  shadows: {
    outline: 0,
  },
  components: {
    Steps: {
      ...StepsStyleConfig,
      baseStyle: (props: any) => {
        const inactiveColor = mode("white", "gray.700")(props)
        return {
          ...StepsStyleConfig.baseStyle(props),
          connector: {
            ...StepsStyleConfig.baseStyle(props).connector,
            borderColor: inactiveColor,
          },
          stepIconContainer: {
            ...StepsStyleConfig.baseStyle(props).stepIconContainer,
            bg: inactiveColor,
            borderColor: inactiveColor,
            _activeStep: {
              ...(StepsStyleConfig.baseStyle(props).stepIconContainer! as CSSObjectWithActiveStep)._activeStep,
              bg: mode(darken(inactiveColor, 0.5), lighten(inactiveColor, 0.5))(props),
            },
          },
        }
      },
    },
    Modal: {
      variants: {
        rsi: {
          dialog: {
            minH: "calc(100vh - 4rem)",
            maxW: "calc(100vw - 4rem)",
            my: "2rem",
            borderRadius: "3xl",
            overflow: "hidden",
          },
        },
      },
    },
  },
}
