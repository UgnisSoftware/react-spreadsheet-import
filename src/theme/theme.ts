import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

import { uploadStepSlotRecipe } from "./uploadStep.recipe"
import { dialogSlotRecipe } from "./modal.recipe"
import { stepsSlotRecipe } from "./steps.recipe"
import { headingRecipe } from "./heading.recipe"
import { selectSheetStep } from "./selectSheetStep.recipe"
import { matchColumnsStepSlotRecipe } from "./matchColumnsStep.recipe"

import "react-data-grid/lib/styles.css"

export const rootId = "chakra-modal-rsi"

export const config = defineConfig({
  theme: {
    keyframes: {
      matchIconScaleIn: {
        from: {
          opacity: "0",
          transform: "scale(0.5)",
        },
        to: {
          opacity: 1,
          transform: "scale(1)",
        },
      },
      matchIconScaleOut: {
        from: {
          opacity: 1,
          transform: "scale(1)",
        },
        to: {
          opacity: 0,
          transform: "scale(0.5)",
        },
      },
    },
    tokens: {
      colors: {
        textColor: { value: "#2D3748" },
        subtitleColor: { value: "#718096" },
        inactiveColor: { value: "#A0AEC0" },
        border: { value: "#E2E8F0" },
        background: { value: "white" },
        backgroundAlpha: { value: "rgba(255,255,255,0)" },
        secondaryBackground: { value: "#EDF2F7" },
        highlight: { value: "#E2E8F0" },
        rsi: {
          50: { value: "#E6E6FF" },
          100: { value: "#C4C6FF" },
          200: { value: "#A2A5FC" },
          300: { value: "#8888FC" },
          400: { value: "#7069FA" },
          500: { value: "#5D55FA" },
          600: { value: "#4D3DF7" },
          700: { value: "#3525E6" },
          800: { value: "#1D0EBE" },
          900: { value: "#0C008C" },
        },
      },
      shadows: {
        outline: { value: 0 },
      },
    },
    recipes: {
      heading: headingRecipe,
    },
    slotRecipes: {
      uploadStep: uploadStepSlotRecipe,
      selectSheetStep: selectSheetStep,
      matchColumnsStep: matchColumnsStepSlotRecipe,
      dialog: dialogSlotRecipe,
      steps: stepsSlotRecipe,
    },
  },
  globalCss: {
    // supporting older browsers but avoiding fill-available CSS as it doesn't work https://github.com/chakra-ui/chakra-ui/blob/073bbcd21a9caa830d71b61d6302f47aaa5c154d/packages/components/css-reset/src/css-reset.tsx#L5
    ":root": {
      "--chakra-vh": "100vh",
      "--chakra-vw": "100vw",
    },
    "@supports (height: 100dvh) and (width: 100dvw) ": {
      "&:root": {
        "--chakra-vh": "100dvh",
        "--chakra-vw": "100dvw",
      },
    },
    ".rdg": {
      contain: "size layout style paint",
      borderRadius: "lg",
      border: "none",
      borderTop: "1px solid var(--rdg-border-color)",
      blockSize: "100%",
      flex: "1",

      // we have to use vars here because chakra does not autotransform unknown props
      "--rdg-row-height": "35px",
      "--rdg-color": "var(--chakra-colors-text-color)",
      "--rdg-background-color": "var(--chakra-colors-background)",
      "--rdg-header-background-color": "var(--chakra-colors-background)",
      "--rdg-row-hover-background-color": "var(--chakra-colors-background)",
      "--rdg-selection-color": "var(--chakra-colors-blue-400)",
      "--rdg-row-selected-background-color": "var(--chakra-colors-rsi-50)",
      "--rdg-row-selected-hover-background-color": "var(--chakra-colors-rsi-100)",
      "--rdg-error-cell-background-color": "var(--chakra-colors-red-50)",
      "--rdg-warning-cell-background-color": "var(--chakra-colors-orange-50)",
      "--rdg-info-cell-background-color": "var(--chakra-colors-blue-50)",
      "--rdg-border-color": "var(--chakra-colors-border)",
      "--rdg-frozen-cell-box-shadow": "none",
      "--rdg-font-size": "var(--chakra-font-sizes-sm)",
    },
    ".rdg-header-row .rdg-cell": {
      color: "textColor",
      textStyle: "xs",
      fontWeight: "bold",
      letterSpacing: "wider",
      textTransform: "uppercase",
      "&:first-of-type": {
        borderTopLeftRadius: "lg",
      },
      "&:last-child": {
        borderTopRightRadius: "lg",
      },
    },
    ".rdg-editor-container": {
      overflow: "visible !important",
      zIndex: 100000,
      position: "relative",
    },
    ".rdg-row:last-child .rdg-cell:first-of-type": {
      borderBottomLeftRadius: "lg",
    },
    ".rdg-row:last-child .rdg-cell:last-child": {
      borderBottomRightRadius: "lg",
    },
    ".rdg[dir='rtl']": {
      "& .rdg-row:last-child .rdg-cell:first-of-type": {
        borderBottomRightRadius: "lg",
        borderBottomLeftRadius: "none",
      },
      "& .rdg-row:last-child .rdg-cell:last-child": {
        borderBottomLeftRadius: "lg",
        borderBottomRightRadius: "none",
      },
    },
    ".rdg-cell": {
      contain: "size layout style paint",
      borderRight: "none",
      borderInlineEnd: "none",
      borderBottom: "1px solid var(--rdg-border-color)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      paddingInline: "8px",
      "&[aria-selected='true']": {
        boxShadow: "inset 0 0 0 1px var(--rdg-selection-color)",
      },
      "&:first-of-type": {
        boxShadow: "none",
        borderInlineStart: "1px solid var(--rdg-border-color)",
      },
      "&:last-child": {
        borderInlineEnd: "1px solid var(--rdg-border-color)",
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
})

// Required for the `npx @chakra-ui/cli typegen ./src/theme/theme.ts` command
export default createSystem(defaultConfig, config)
