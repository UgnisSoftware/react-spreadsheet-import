type Props = {
  config?: Config
  fields: Fields
  hooks?: Hooks
  onSubmit: (data: Result) => void
}

type Config = {
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
type Fields = Field[]

type Field = {
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
  examples: string[]
}

type Checkbox = {
  type: 'checkbox'
  // Alternate values to be treated as booleans, e.g. 'yes'-> true, 'no' -> false
  booleanMatches: {[key: string]: boolean}[]
}

type Select = {
  type : 'select'
  // Options displayed in Select component
  options: SelectOptions
}

type SelectOptions = {
  // UI-facing option label
  label: string
  // Field entry matching criteria as well as select output
  value: string | number
}

type Input = {
  type: 'input'
}

type Validation =  BasicValidation | RegexValidation

type BasicValidation = {
  rule: 'unique' | 'required' 	//... to be determined
  errorMessage?: string
}

type RegexValidation = {
  rule: 'regex'
  regexOptions?: RegexOption[]
  errorMessage: string
}

type RegexOption = 'i' | 'm' | 'u' | 's'

type Hooks = {
  // Runs after column matching and on entry change, more performant
  rowHooks: RowHook[]
  // Runs after column matching and on entry change
  tableHooks: TableHook[]
  // Runs once after data import, used for data mutations
  initalHooks: TableHook[]
}

type RowHook = ({...rowValues}: object) => Promise<Entry>
type TableHook = (tableData: object[]) => Promise<Entry[]>

type Entry = {
  value: unknown
  info: Info[]
}

type Info = {
  message: string
  level: 'info' | 'warning' | 'error'
}

type Result = {
  validData: object[]
  invalidData: object[]
  all: []
}

type MaybeConfig = {
  allowInvalidSubmit?: boolean
  displayEncoding?: boolean
  allowCustomFields?: boolean
}