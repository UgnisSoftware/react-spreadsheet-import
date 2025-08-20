import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react"
import { withThemeByClassName } from "@storybook/addon-themes"
import type { Preview } from "@storybook/react"
import { config } from "../src/theme/theme"
import { ThemeProvider } from "next-themes"

const system = createSystem(defaultConfig, config)

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ChakraProvider value={system}>
        <ThemeProvider enableSystem attribute="class" disableTransitionOnChange>
          <Story />
        </ThemeProvider>
      </ChakraProvider>
    ),
    withThemeByClassName({
      defaultTheme: "light",
      themes: { light: "", dark: "dark" },
    }),
  ],
}

export default preview
