export type Props = {
  config?: Config
  fields: Fields
  hooks?: Hooks
  onSubmit: (data: Result) => void
}

export type Config = {
  // Title of importer modal
  title?: string
  // Specifies maximum number of rows for a single import
  maxRecords?: number
  // Automatically map imported headers to specified fields if possible
  autoMapHeaders?: boolean
  // Theme cofiguration passed to underlying Chakra-UI
  customTheme?: object
}

// Data model RSI uses for spreadsheet imports
export type Fields = Field[]

export type Field = {
  // UI-facing field label
  label: string
  // Field's unique identifier
  key: string
  // UI-facing additional information displayed via tooltip and ? icon
  description?: string
  // Alternate header titles used for fields' auto-matching, e.g. "fname" -> "firstName"
  matches?: string[]
  // Validations used for field entries
  validations?: Validation[]
  // Field entry component, default: Input
  fieldType: Checkbox | Select | Input
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

export type Hooks = {
  // Runs after column matching and on entry change, more performant
  rowHooks: RowHook[]
  // Runs after column matching and on entry change
  tableHooks: TableHook[]
  // Runs once after data import, used for data mutations
  initalHooks: TableHook[]
}

export type RowHook = ({ ...rowValues }: object) => Promise<Entry>
export type TableHook = (tableData: object[]) => Promise<Entry[]>

export type Entry = {
  value: unknown
  info: Info[]
}

export type ErrorLevel = "info" | "warning" | "error"

export type Info = {
  message: string
  level: ErrorLevel
}

export type Result = {
  validData: object[]
  invalidData: object[]
  all: []
}

export type MaybeConfig = {
  allowInvalidSubmit?: boolean
  displayEncoding?: boolean
  allowCustomFields?: boolean
}
