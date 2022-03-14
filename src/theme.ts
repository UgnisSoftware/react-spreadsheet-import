import { StepsStyleConfig } from "chakra-ui-steps"
import { darken, lighten, mode } from "@chakra-ui/theme-tools"
import type { CSSObject } from "@chakra-ui/react"
import { withDefaultColorScheme } from "@chakra-ui/react"
import type { DeepPartial } from "ts-essentials"

type CSSObjectWithActiveStep = CSSObject & { _activeStep: CSSObject }

export const themeOverrides = {
  colors: {
    textColor: "#2D3748",
    subtitleColor: "#718096",
    background: "white",
    rsi: {
      50: "#E6E6FF",
      100: "#4C63B6",
      200: "#4C63B6",
      300: "#8888FC",
      400: "#7069FA",
      500: "#5D55FA",
      600: "#4D3DF7",
      700: "#3525E6",
      800: "#2D3A8C",
      900: "#0C008C",
    },
  },
  shadows: {
    outline: 0,
  },
  components: {
    UploadStep: {
      baseStyle: {
        heading: {
          fontSize: "3xl",
          color: "textColor",
          mb: "2rem",
        },
        title: {
          fontSize: "2xl",
          lineHeight: 8,
          fontWeight: "semibold",
          color: "textColor",
        },
        subtitle: {
          fontSize: "md",
          lineHeight: 6,
          color: "subtitleColor",
          mb: "1rem",
        },
        dropzoneText: {
          size: "lg",
          lineHeight: 7,
          fontWeight: "semibold",
          color: "textColor",
        },
        dropZoneBorder: "rsi.500",
        dropzoneButton: {
          bg: "rsi.500",
          mt: "1rem",
        },
      },
    },
    SelectSheetStep: {
      baseStyle: {
        heading: {
          color: "textColor",
          mb: 8,
          fontSize: "3xl",
        },
        radio: {},
        radioLabel: {
          color: "textColor",
        },
      },
    },
    SelectHeaderStep: {
      baseStyle: {
        heading: {
          color: "textColor",
          mb: 8,
          fontSize: "3xl",
        },
      },
    },
    MatchIcon: {
      baseStyle: (props: any) => {
        return {
          ...StepsStyleConfig.baseStyle(props).stepIconContainer,
          borderWidth: "2px",
          bg: "white",
          borderColor: "yellow.500",
          color: "white",
          transitionDuration: "ultra-fast",
        }
      },
      defaultProps: {
        size: "md",
        colorScheme: "green",
      },
    },
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
          header: {
            bg: "gray.100",
            px: "2rem",
            py: "1.5rem",
          },
          body: {
            bg: "background",
            display: "flex",
            paddingX: "2rem",
            paddingY: "2rem",
            flexDirection: "column",
            flex: 1,
            overflow: "auto",
            height: "100%",
          },
          footer: {
            bg: "gray.100",
            py: "1.5rem",
            justifyContent: "center",
          },
          dialog: {
            outline: "unset",
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
  styles: {
    global: {
      ".rdg": {
        contain: "size layout style paint",
        borderRadius: "8px",
        border: "none",
        borderTop: "1px solid var(--rdg-border-color)",
        blockSize: "100%",

        // we have to use vars here because chakra does not autotransform unknown props
        "--rdg-row-height": "35px",
        "--rdg-color": "var(--chakra-colors-gray-800)",
        "--rdg-background-color": "var(--chakra-colors-white)",
        "--rdg-header-background-color": "var(--chakra-colors-white)",
        "--rdg-row-hover-background-color": "var(--chakra-colors-white)",
        "--rdg-selection-color": "var(--chakra-colors-blue-400)",
        "--rdg-row-selected-background-color": "var(--chakra-colors-rsi-50)",
        "--rdg-error-cell-background-color": "var(--chakra-colors-red-50)",
        "--rdg-warning-cell-background-color": "var(--chakra-colors-orange-50)",
        "--rdg-info-cell-background-color": "var(--chakra-colors-blue-50)",
        "--rdg-border-color": "var(--chakra-colors-gray-100)",
        "--rdg-frozen-cell-box-shadow": "none",
        "--rdg-font-size": "14px",
      },
      ".rdg-header-row .rdg-cell": {
        color: "gray.700",
        fontSize: "xs",
        lineHeight: 10,
        fontWeight: "bold",
        letterSpacing: "wider",
        textTransform: "uppercase",
        "&:first-of-type": {
          borderRadius: "8px 0 0 0",
        },
        "&:last-child": {
          borderRadius: "0 8px 0 0",
        },
      },
      ".rdg-row:last-child .rdg-cell:first-of-type": {
        borderRadius: "0 0 0 8px",
      },
      ".rdg-row:last-child .rdg-cell:last-child": {
        borderRadius: "0 0 8px 0",
      },
      ".rdg-cell": {
        contain: "size layout style paint",
        borderRight: "none",
        borderBottom: "1px solid var(--rdg-border-color)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        "&[aria-selected='true']": {
          boxShadow: "inset 0 0 0 1px var(--rdg-selection-color)",
        },
        "&:first-of-type": {
          borderLeft: "1px solid var(--rdg-border-color)",
        },
        "&:last-child": {
          borderRight: "1px solid var(--rdg-border-color)",
        },
      },
      ".rdg-cell-error": {
        backgroundColor: "var(--rdg-error-cell-background-color)",
      },
      ".rdg-cell-warning": {
        backgroundColor: "var(--rdg-warning-cell-background-color)",
      },
      ".rdg-cell-info": {
        backgroundColor: "var(--rdg-info-cell-background-color)",
      },
      ".rdg-static": {
        cursor: "pointer",
      },
      ".rdg-static .rdg-header-row": {
        display: "none",
      },
      ".rdg-static .rdg-cell": {
        "--rdg-selection-color": "none",
      },
      ".rdg-example .rdg-cell": {
        "--rdg-selection-color": "none",
        borderBottom: "none",
      },

      ".rdg-radio": {
        display: "flex",
        alignItems: "center",
      },
      ".rdg-checkbox": {
        "--rdg-selection-color": "none",
        display: "flex",
        alignItems: "center",
      },
    },
  },
} as const

export const colorSchemeOverrides = withDefaultColorScheme({
  colorScheme: "rsi",
  components: ["Button"],
})

export type CustomTheme = DeepPartial<typeof themeOverrides>
