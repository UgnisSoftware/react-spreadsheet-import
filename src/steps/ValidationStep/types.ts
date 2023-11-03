import { InfoWithSource } from "../../types"

export type Meta = { __index: string; __errors?: Error | null }
export type Error = { [key: string]: InfoWithSource }
export type Errors = { [id: string]: Error }
