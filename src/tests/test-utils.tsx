import React, { ReactElement } from "react"
import { render, RenderOptions } from "@testing-library/react"
import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"
import { config } from "@/theme/theme"
import { Providers } from "@/components/ui/Providers"
import { mockRsiValues } from "@/stories/mockRsiValues"

const system = createSystem(defaultConfig, config)

export function AllTheProviders({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider enableSystem attribute="class" disableTransitionOnChange>
        <Providers rsiValues={mockRsiValues}>{children}</Providers>
      </ThemeProvider>
    </ChakraProvider>
  )
}

export function ChakraProviders({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider enableSystem attribute="class" disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </ChakraProvider>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: AllTheProviders, ...options })

const chakraProviderRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: ChakraProviders, ...options })

export * from "@testing-library/react"
export { customRender as render, chakraProviderRender as chakraRender }
