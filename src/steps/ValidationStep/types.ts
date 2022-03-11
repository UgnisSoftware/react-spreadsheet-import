import type { Info } from "../../types"

export type Meta = { __index: number; __errors?: Error | null }
export type Error = { [key: string]: Info }
export type Errors = { [id: string]: Error }