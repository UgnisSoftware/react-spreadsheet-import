import { useContext } from "react"
import { RsiContext } from "../components/Providers"
import type { RsiProps } from "../types"
import type { MarkRequired } from "ts-essentials"

export const useRsi = <T extends string>() => useContext<MarkRequired<RsiProps<T>, "autoMapDistance">>(RsiContext)
