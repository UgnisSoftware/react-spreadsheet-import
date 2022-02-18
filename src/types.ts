type MapKeyTupleToProps<T, P extends [keyof T] | Array<keyof T>> = {
  [K in keyof P]: P[K] extends keyof T ? T[P[K]] : never
}

export type RsiProps<T = any> = {
  isOpen: boolean
  onClose: () => void
  // Theme configuration passed to underlying Chakra-UI
  customTheme?: object
  // Field description for requested data
  fields: Fields<T>
  // Runs after column matching and on entry change, more performant
  rowHook?: RowHook<T>
  // Runs after column matching and on entry change
  tableHook?: TableHook<T>
  // Runs once before validation step, used for data mutations
  initialHook?: InitHook<T>
  // Function called after user finishes the flow
  onSubmit: (data: Result<T>) => void
}

// Data model RSI uses for spreadsheet imports
export type Fields<T> = Field<T>[]

export type Field<T> = {
  // UI-facing field label
  label: string
  // Field's unique identifier
  key: Extract<keyof T, string>
  // UI-facing additional information displayed via tooltip and ? icon
  description?: string
  // Alternate header titles used for fields' auto-matching, e.g. "fname" -> "firstName"
  alternateNames?: string[]
  // Validations used for field entries
  validations?: Validation[]
  // Field entry component, default: Input
  fieldType: Checkbox | Select | Input | NumberInput
  // UI-facing values shown to user as field examples pre-upload phase
  examples?: string[]
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

export type NumberInput = {
  type: "numberInput"
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

export type RowHook<T> = (row: T, table: T[], addError: (fieldKey: keyof T, error: Info) => void) => Promise<T>
export type TableHook<T> = (
  table: T[],
  addError: (fieldKey: keyof T, rowIndex: number, error: Info) => void,
) => Promise<T[]>
export type InitHook<T> = (table: T[]) => Promise<T[]>

export type ErrorLevel = "info" | "warning" | "error"

export type Info = {
  message: string
  level: ErrorLevel
}

export type Result<T> = {
  validData: T[]
  invalidData: T[]
  all: []
}

export type MaybeConfig = {
  allowInvalidSubmit?: boolean
  displayEncoding?: boolean
  allowCustomFields?: boolean
}
