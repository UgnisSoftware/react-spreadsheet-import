import type { Info } from "../../types.js"

export type Meta = { __index: string; __errors?: Error | null }
export type Error = { [key: string]: Info }
export type Errors = { [id: string]: Error }
