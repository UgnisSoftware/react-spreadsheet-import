import { useContext } from "react"
import { RsiContext } from "../components/Providers"
import type { RsiProps } from "../types"

export const useRsi = <T extends string>() =>
  useContext<Omit<RsiProps<T>, "autoMapDistance"> & { autoMapDistance: number }>(RsiContext)
