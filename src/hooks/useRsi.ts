import { useContext } from "react"
import { RsiContext } from "../components/Providers"

export const useRsi = () => useContext(RsiContext)
