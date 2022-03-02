import type { Meta } from "./steps/ValidationStep/types"
import type { DeepReadonly } from "ts-essentials"

export type RsiProps<T extends string> = {
  // Title of importer modal
  title?: string
  // Specifies maximum number of rows for a single import
  maxRecords?: number
  // Automatically map imported headers to specified fields if possible. Default: true
  autoMapHeaders?: boolean
  // Is modal visible.
  isOpen: boolean
  // Allows submitting with errors. Default: true
  allowInvalidSubmit?: boolean
  // callback when RSI is closed before final submit
  onClose: () => void
  // Theme configuration passed to underlying Chakra-UI
  customTheme?: object
  // Field description for requested data
  fields: Fields<T>
  // Runs after column matching and on entry change, more performant
  rowHook?: RowHook<T>
  // Runs after column matching and on entry change
  tableHook?: TableHook<T>
  // // Runs once before validation step, used for data mutations
  initialHook?: InitHook<T>
  // Function called after user finishes the flow
  onSubmit: (data: Result<T>) => void
}

export type Data<T extends string> = { [key in T]: string | boolean | number | undefined }

// Data model RSI uses for spreadsheet imports
export type Fields<T extends string> = DeepReadonly<Field<T>[]>

export type Field<T extends string> = {
  // UI-facing field label
  label: string
  // Field's unique identifier
  key: T
  // UI-facing additional information displayed via tooltip and ? icon
  description?: string
  // Alternate labels used for fields' auto-matching, e.g. "fname" -> "firstName"
  alternateMatches?: string[]
  // Validations used for field entries
  validations?: Validation[]
  // Field entry component, default: Input
  fieldType: Checkbox | Select | Input
  // UI-facing values shown to user as field examples pre-upload phase
  example?: string
}

export type Checkbox = {
  type: "checkbox"
  // Alternate values to be treated as booleans, e.g. 'yes'-> true, 'no' -> false
  booleanMatches?: { [key: string]: boolean }[]
}

export type Select = {
  type: "select"
  // Options displayed in Select component
  options: SelectOptions[]
}

export type SelectOptions = {
  // UI-facing option label
  label: string
  // Field entry matching criteria as well as select output
  value: string | number
}

export type Input = {
  type: "input"
}

export type Validation = BasicValidation | RegexValidation

export type BasicValidation = {
  rule: "unique" | "required" //... to be determined
  errorMessage?: string
  level?: ErrorLevel
}

export type RegexValidation = {
  rule: "regex"
  value: string
  flags?: string
  errorMessage: string
  level?: ErrorLevel
}

export type RowHook<T extends string> = (
  row: Data<T>,
  addError: (fieldKey: T, error: Info) => void,
  table: Data<T>[],
) => Data<T>
export type TableHook<T extends string> = (
  table: Data<T>[],
  addError: (rowIndex: number, fieldKey: T, error: Info) => void,
) => Data<T>[]
export type InitHook<T extends string> = (table: Data<T>[]) => Data<T>[]

export type ErrorLevel = "info" | "warning" | "error"

export type Info = {
  message: string
  level: ErrorLevel
}

export type Result<T extends string> = {
  validData: Data<T>[]
  invalidData: Data<T>[]
  all: (Data<T> & Meta)[]
}
