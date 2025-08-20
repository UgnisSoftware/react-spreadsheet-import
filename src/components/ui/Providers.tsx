import { Toaster } from "@/components/ui/toaster"
import { RSIContextContextValue, RSIContextProvider } from "@/contexts/RSIContext"
import { ReactNode } from "react"

type ProvidersProps<T extends string> = {
  children: ReactNode
  rsiValues: RSIContextContextValue<T>
}

export function Providers<T extends string>(props: ProvidersProps<T>) {
  const { children, rsiValues } = props

  return (
    <RSIContextProvider rsiValues={rsiValues}>
      {children}
      <Toaster />
    </RSIContextProvider>
  )
}
