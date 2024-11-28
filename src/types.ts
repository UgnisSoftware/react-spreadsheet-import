import type { Meta } from "./steps/ValidationStep/types"
import type { DeepReadonly } from "ts-essentials"
import type { TranslationsRSIProps } from "./translationsRSIProps"
import type { Columns } from "./steps/MatchColumnsStep/MatchColumnsStep"
import type { StepState } from "./steps/UploadFlow"

export type RsiProps<T extends string> = {
  // Is modal visible.
  isOpen: boolean
  // callback when RSI is closed before final submit
  onClose: () => void
  // Field description for requested data
  fields: Fields<T>
  // Runs after file upload step, receives and returns raw sheet data
  uploadStepHook?: (data: RawData[]) => Promise<RawData[]>
  // Runs after header selection step, receives and returns raw sheet data
  selectHeaderStepHook?: (headerValues: RawData, data: RawData[]) => Promise<{ headerValues: RawData; data: RawData[] }>
  // Runs once before validation step, used for data mutations and if you want to change how columns were matched
  matchColumnsStepHook?: (table: Data<T>[], rawData: RawData[], columns: Columns<T>) => Promise<Data<T>[]>
  // Runs after column matching and on entry change
  rowHook?: RowHook<T>
  // Runs after column matching and on entry change
  tableHook?: TableHook<T>
  // Function called after user finishes the flow. You can return a promise that will be awaited.
  onSubmit: (data: Result<T>, file: File) => void | Promise<any>
  // Allows submitting with errors. Default: true
  allowInvalidSubmit?: boolean
  // Enable navigation in stepper component and show back button. Default: false
  isNavigationEnabled?: boolean
  // Translations for each text
  translations?: TranslationsRSIProps
  // Theme configuration passed to underlying Chakra-UI
  customTheme?: object
  // Specifies maximum number of rows for a single import
  maxRecords?: number
  // Maximum upload filesize (in bytes)
  maxFileSize?: number
  // Automatically map imported headers to specified fields if possible. Default: true
  autoMapHeaders?: boolean
  // When field type is "select", automatically match values if possible. Default: false
  autoMapSelectValues?: boolean
  // Headers matching accuracy: 1 for strict and up for more flexible matching
  autoMapDistance?: number
  // Initial Step state to be rendered on load
  initialStepState?: StepState
  // Sets SheetJS dateNF option. If date parsing is applied, date will be formatted e.g. "yyyy-mm-dd hh:mm:ss", "m/d/yy h:mm", 'mmm-yy', etc.
  dateFormat?: string
  // Sets SheetJS "raw" option. If true, parsing will only be applied to xlsx date fields.
  parseRaw?: boolean
  // Use for right-to-left (RTL) support
  rtl?: boolean
  // When both rowHook and tableHook are set, it decides when to run a full tableHook depending on the number of changed rows
  runTableHookThreshold?: number
}

export type RawData = Array<string | undefined>

export type Data<T extends string> = { [key in T]: string | boolean | undefined }

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
  // Alternate values to be treated as booleans, e.g. {yes: true, no: false}
  booleanMatches?: { [key: string]: boolean }
}

export type Select = {
  type: "select"
  // Options displayed in Select component
  options: SelectOption[]
}

export type SelectOption = {
  // UI-facing option label
  label: string
  // Field entry matching criteria as well as select output
  value: string
}

export type Input = {
  type: "input"
}

export type Validation = RequiredValidation | UniqueValidation | RegexValidation

export type RequiredValidation = {
  rule: "required"
  errorMessage?: string
  level?: ErrorLevel
}

export type UniqueValidation = {
  rule: "unique"
  allowEmpty?: boolean
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
) => Data<T> | Promise<Data<T>>
export type TableHook<T extends string> = (
  table: Data<T>[],
  addError: (rowIndex: number, fieldKey: T, error: Info) => void,
) => Data<T>[] | Promise<Data<T>[]>

export type ErrorLevel = "info" | "warning" | "error"

export type Info = {
  message: string
  level: ErrorLevel
}

export enum ErrorSources {
  Table = "table",
  Row = "row",
}

/*
   Source determines whether the error is from the full table or row validation
   Table validation is tableHook and "unique" validation
   Row validation is rowHook and all other validations
   it is used to determine if row.__errors should be updated or not depending on different validations
*/
export type InfoWithSource = Info & {
  source: ErrorSources
}

export type Result<T extends string> = {
  validData: Data<T>[]
  invalidData: Data<T>[]
  all: (Data<T> & Meta)[]
}
