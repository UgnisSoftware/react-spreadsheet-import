import type { DeepReadonly } from "ts-essentials"
import type { Translations } from "@/translations"
import type { Columns, Meta, StepState } from "@/steps/types"

/**
 * Props for React Spreadsheet Import component
 * @template T - Generic type for field keys
 */
export type RsiProps<T extends string> = {
  /** Indicates whether the modal is visible */
  isOpen: boolean
  /** Callback triggered when RSI is closed before final submission */
  onClose: () => void
  /** Field descriptions for requested data */
  fields: Fields<T>
  /** Hook executed after file upload step, receives and returns raw sheet data */
  uploadStepHook?: (data: RawData[]) => Promise<RawData[]>
  /** Hook executed after header selection step, receives and returns raw sheet data */
  selectHeaderStepHook?: (headerValues: RawData, data: RawData[]) => Promise<{ headerValues: RawData; data: RawData[] }>
  /** Hook executed before validation step, used for data mutations and to modify column matching */
  matchColumnsStepHook?: (table: Data<T>[], rawData: RawData[], columns: Columns<T>) => Promise<Data<T>[]>
  /** Hook executed after column matching and on entry change */
  rowHook?: RowHook<T>
  /** Hook executed after column matching and on entry change */
  tableHook?: TableHook<T>
  /** Function called after user completes the flow. Can return a promise that will be awaited */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: Result<T>, file: File) => void | Promise<any>
  /** Allows submission with errors. Default: true */
  allowInvalidSubmit?: boolean
  /** Enables navigation in stepper component and shows back button. Default: false */
  isNavigationEnabled?: boolean
  /** Translations for each text */
  translations?: Translations
  /** Theme configuration passed to underlying Chakra-UI */
  customTheme?: object
  /** Specifies maximum number of rows for a single import */
  maxRecords?: number
  /** Maximum upload filesize (in bytes) */
  maxFileSize?: number
  /** Automatically map imported headers to specified fields if possible. Default: true */
  autoMapHeaders?: boolean
  /** When field type is "select", automatically match values if possible. Default: false */
  autoMapSelectValues?: boolean
  /** Headers matching accuracy: 1 for strict and higher for more flexible matching */
  autoMapDistance?: number
  /** Initial Step state to be rendered on load */
  initialStepState?: StepState
  /** Sets SheetJS dateNF option. If date parsing is applied, date will be formatted e.g. "yyyy-mm-dd hh:mm:ss", "m/d/yy h:mm", 'mmm-yy', etc. */
  dateFormat?: string
  /** Sets SheetJS "raw" option. If true, parsing will only be applied to xlsx date fields. */
  parseRaw?: boolean
  /** Used for right-to-left (RTL) support */
  rtl?: boolean
}

/** Type representing raw data from a spreadsheet */
export type RawData = Array<string | undefined>

/** Type representing structured data with typed keys */
export type Data<T extends string> = {
  [key in T]: string | boolean | undefined
}

/** Type representing field descriptions for spreadsheet imports */
export type Fields<T extends string> = DeepReadonly<Field<T>[]>

/**
 * Description of a field for import
 * @template T - Generic type for the field key
 */
export type Field<T extends string> = {
  /** Label displayed in the user interface */
  label: string
  /** Unique identifier for the field */
  key: T
  /** Additional information displayed via tooltip and ? icon */
  description?: string
  /** Alternative labels used for field auto-matching, e.g. "fname" -> "firstName" */
  alternateMatches?: string[]
  /** Validations used for field entries */
  validations?: Validation[]
  /** Component type for field entry, default: Input */
  fieldType: Checkbox | Select | Input
  /** Example values shown to user in pre-upload phase */
  example?: string
}

/** Type for checkbox field */
export type Checkbox = {
  type: "checkbox"
  /** Alternative values to be treated as booleans, e.g. {yes: true, no: false} */
  booleanMatches?: { [key: string]: boolean }
}

/** Type for select field */
export type Select = {
  type: "select"
  /** Options displayed in the Select component */
  options: SelectOption[]
}

/** Type for select option */
export type SelectOption = {
  /** Label displayed in the user interface */
  label: string
  /** Matching criteria for field entry as well as select output */
  value: string
}

/** Type for input field */
export type Input = {
  type: "input"
}

/** Union type for different possible validations */
export type Validation = RequiredValidation | UniqueValidation | RegexValidation

/** Type for required field validation */
export type RequiredValidation = {
  rule: "required"
  /** Custom error message */
  errorMessage?: string
  /** Error level */
  level?: ErrorLevel
}

/** Type for uniqueness validation */
export type UniqueValidation = {
  rule: "unique"
  /** Allows empty values */
  allowEmpty?: boolean
  /** Custom error message */
  errorMessage?: string
  /** Error level */
  level?: ErrorLevel
}

/** Type for regex validation */
export type RegexValidation = {
  rule: "regex"
  /** Regular expression to use */
  value: string
  /** Regular expression flags */
  flags?: string
  /** Custom error message */
  errorMessage: string
  /** Error level */
  level?: ErrorLevel
}

/**
 * Type for row validation hook
 * @template T - Generic type for field keys
 */
export type RowHook<T extends string> = (
  row: Data<T>,
  addError: (fieldKey: T, error: Info) => void,
  table: Data<T>[],
) => Data<T> | Promise<Data<T>>

/**
 * Type for table validation hook
 * @template T - Generic type for field keys
 */
export type TableHook<T extends string> = (
  table: Data<T>[],
  addError: (rowIndex: number, fieldKey: T, error: Info) => void,
) => Data<T>[] | Promise<Data<T>[]>

/** Possible levels for error messages */
export type ErrorLevel = "info" | "warning" | "error"

/** Type for error information */
export type Info = {
  /** Error message */
  message: string
  /** Error level */
  level: ErrorLevel
}

/** Possible error sources */
export enum ErrorSources {
  Table = "table",
  Row = "row",
}

/**
 * Extended type for error information with source
 * Source determines whether the error comes from full table or row validation
 * Table validation is tableHook and "unique" validation
 * Row validation is rowHook and all other validations
 * Used to determine if row.__errors should be updated based on different validations
 */
export type InfoWithSource = Info & {
  source: ErrorSources
}

/**
 * Type for final import result
 * @template T - Generic type for field keys
 */
export type Result<T extends string> = {
  /** Valid data */
  validData: Data<T>[]
  /** Invalid data */
  invalidData: Data<T>[]
  /** All data with metadata */
  all: (Data<T> & Meta)[]
}
