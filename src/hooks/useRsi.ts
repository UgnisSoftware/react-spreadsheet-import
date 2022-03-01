import { useContext } from "react"
import { RsiContext } from "../components/Providers"
import type {RsiProps} from "../types";

export const useRsi = <T>() => useContext<RsiProps<T>>(RsiContext)
