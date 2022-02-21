import { Box, ChakraProvider, Checkbox, extendTheme, Input, Select, Switch } from "@chakra-ui/react"
import { EditableTable } from "../components/EditableTable"
import type { ChangeEvent } from "react"
import { colorSchemeOverrides, themeOverrides } from "../theme"
import type { Field, Fields, Info, InitHook, RowHook, TableHook } from "../types"
import type { Column, FormatterProps } from "react-data-grid"
import { useRowSelection } from "react-data-grid"
import { useMemo, useState } from "react"
export default {
  title: "Validation table",
}

type Meta = { __index: number; __errors?: Error | null }
type Error = { [key: string]: Info }
type Errors = { [id: string]: Error }

const SELECT_COLUMN_KEY = "select-row"

function SelectFormatter(props: FormatterProps<unknown>) {
  const [isRowSelected, onRowSelectionChange] = useRowSelection()

  return (
    <Checkbox
      bg="white"
      aria-label="Select"
      isChecked={isRowSelected}
      onChange={(event) => {
        onRowSelectionChange({
          row: props.row,
          checked: Boolean(event.target.checked),
          isShiftClick: (event.nativeEvent as MouseEvent).shiftKey,
        })
      }}
    />
  )
}

const SelectColumn: Column<any, any> = {
  key: SELECT_COLUMN_KEY,
  name: "",
  width: 35,
  maxWidth: 35,
  resizable: false,
  sortable: false,
  frozen: true,
  cellClass: "rdg-checkbox",
  formatter: SelectFormatter,
}

const initialData = [
  {
    text: "Hello",
    num: "123123",
    select: "one",
    bool: true,
  },
  {
    text: "Hello",
    num: "12312zsas3",
    select: "two",
    bool: true,
  },
  {
    text: "Whooa",
    num: "123123",
    select: null,
    bool: false,
  },
  {
    text: "Goodbye",
    num: "111",
    select: "two",
    bool: true,
  },
]

const fields: Fields<any> = [
  {
    key: "text",
    label: "Texts",
    fieldType: { type: "input" },
    validations: [
      {
        rule: "unique",
        errorMessage: "Text must be unique",
        level: "info",
      },
    ],
  },
  {
    key: "num",
    label: "Number",
    fieldType: { type: "input" },
    validations: [
      {
        rule: "regex",
        value: "^\\d+$",
        errorMessage: "Test must be number",
        level: "warning",
      },
    ],
  },
  {
    key: "select",
    label: "Select",
    fieldType: {
      type: "select",
      options: [
        { label: "One", value: "one" },
        { label: "Two", value: "two" },
      ],
    },
    validations: [
      {
        rule: "required",
        errorMessage: "Select is required",
      },
    ],
  },
  {
    key: "bool",
    label: "Bool",
    fieldType: { type: "checkbox" },
  },
]

const addErrorsAndRunHooks = <T extends Record<string, string | number | boolean | Error>>(
  data: (T & Meta)[],
  fields: Fields<T>,
  rowHook?: RowHook<T>,
  tableHook?: TableHook<T>,
): (T & Meta)[] => {
  let errors: Errors = {}

  const addHookError = <T,>(rowIndex: number, fieldKey: keyof T, error: Info) => {
    errors[rowIndex] = {
      ...errors[rowIndex],
      [fieldKey]: error,
    }
  }

  if (tableHook) {
    data = addIndexes(tableHook(data, addHookError))
  }

  if (rowHook) {
    data = addIndexes(data.map((value, index) => rowHook(value, (...props) => addHookError(index, ...props), data)))
  }

  fields.forEach((field) => {
    field.validations?.forEach((validation) => {
      switch (validation.rule) {
        case "unique": {
          const values = data.map((entry) => entry[field.key])
          values.forEach((value, index) => {
            if (values.indexOf(value) !== values.lastIndexOf(value)) {
              errors[index] = {
                ...errors[index],
                [field.key]: {
                  level: validation.level || "error",
                  message: validation.errorMessage || "Field must be unique",
                },
              }
            }
          })
          break
        }
        case "required": {
          data.forEach((entry, index) => {
            if (entry[field.key] === null || entry[field.key] === undefined || entry[field.key] === "") {
              errors[index] = {
                ...errors[index],
                [field.key]: {
                  level: validation.level || "error",
                  message: validation.errorMessage || "Field is required",
                },
              }
            }
          })
          break
        }
        case "regex": {
          const regex = new RegExp(validation.value, validation.flags)
          data.forEach((entry, index) => {
            if (!entry[field.key]?.toString()?.match(regex)) {
              errors[index] = {
                ...errors[index],
                [field.key]: {
                  level: validation.level || "error",
                  message:
                    validation.errorMessage ||
                    `Field did not match the regex /${validation.value}/${validation.flags} `,
                },
              }
            }
          })
          break
        }
      }
    })
  })

  return data.map((value, index) => {
    if (errors[index]) {
      return { ...value, __errors: errors[index] }
    }
    if (!errors[index] && value?.__errors) {
      return { ...value, __errors: null }
    }
    return value
  })
}

const addIndexes = <T,>(arr: T[]): (T & { __index: number })[] =>
  arr.map((value, index) => {
    if ("__index" in value) {
      return value as T & { __index: number }
    }
    return { ...value, __index: index }
  })

const theme = extendTheme(colorSchemeOverrides, themeOverrides)

const defaultInitialHook = <T,>(rows: T): T => rows

interface Props<T> {
  fields: Fields<T>
  initialData: T[]
  rowHook?: RowHook<T>
  tableHook?: TableHook<T>
  initialHook?: InitHook<T>
}

const TableComponent = <T extends {}>({
  fields,
  initialData,
  rowHook,
  tableHook,
  initialHook = defaultInitialHook,
}: Props<T>) => {
  const [data, setData] = useState<(T & Meta)[]>(
    addErrorsAndRunHooks(addIndexes(initialHook(initialData)), fields, rowHook, tableHook),
  )
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<number | string>>(new Set())

  const updateRow = (rows: typeof data) => {
    setData(addErrorsAndRunHooks(rows, fields, rowHook, tableHook))
  }
  const columns = useMemo(
    () => [
      SelectColumn,
      ...fields.map((column: Field<T>) => ({
        key: column.key,
        name: column.label,
        resizable: true,
        editable: column.fieldType.type !== "checkbox",
        editor: ({ row, onRowChange, onClose }: any) =>
          column.fieldType.type === "select" ? (
            <Box pl="0.5rem">
              <Select
                variant="unstyled"
                autoFocus
                size="small"
                value={row[column.key]}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                  onRowChange({ ...row, [column.key]: event.target.value }, true)
                }}
                placeholder=" "
              >
                {column.fieldType.options.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </Select>
            </Box>
          ) : (
            <Box pl="0.5rem">
              <Input
                variant="unstyled"
                autoFocus
                size="small"
                value={row[column.key]}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  onRowChange({ ...row, [column.key]: event.target.value })
                }}
                onBlur={onClose}
              />
            </Box>
          ),
        editorOptions: {
          editOnClick: true,
        },
        formatter: ({ row, onRowChange }: any) =>
          column.fieldType.type === "checkbox" ? (
            <Box
              display="flex"
              alignItems="center"
              height="100%"
              onClick={(event) => {
                event.stopPropagation()
              }}
            >
              <Switch
                isChecked={row[column.key]}
                onChange={() => {
                  onRowChange({ ...row, [column.key]: !row[column.key] }, true)
                }}
              />
            </Box>
          ) : column.fieldType.type === "select" ? (
            column.fieldType.options.find((option) => option.value === row[column.key])?.label || null
          ) : (
            row[column.key]
          ),
        cellClass: (row: typeof data[number]) => {
          switch (row.__errors?.[column.key]?.level) {
            case "error":
              return "rdg-cell-error"
            case "warning":
              return "rdg-cell-warning"
            case "info":
              return "rdg-cell-info"
            default:
              return ""
          }
        },
      })),
    ],
    [],
  )

  return (
    <EditableTable
      rowKeyGetter={(row) => row.__index}
      rows={data}
      onRowsChange={updateRow}
      columns={columns}
      selectedRows={selectedRows}
      onSelectedRowsChange={(rows) => {
        setSelectedRows(rows)
      }}
    />
  )
}

export const Table = () => (
  <ChakraProvider theme={theme}>
    <div style={{ blockSize: "calc(100vh - 32px)" }}>
      <TableComponent fields={fields} initialData={initialData} />
    </div>
  </ChakraProvider>
)
