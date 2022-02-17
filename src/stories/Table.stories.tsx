import { Box, ChakraProvider, Checkbox, extendTheme, Input, Select, Switch } from "@chakra-ui/react"
import { EditableTable } from "../components/EditableTable"
import { connect, ignoreState, useLape } from "lape"
import type { ChangeEvent } from "react"
import { colorSchemeOverrides, themeOverrides } from "../theme"
import type { Field, Fields, Info } from "../types"
import type { Column, FormatterProps } from "react-data-grid"
import { useRowSelection } from "react-data-grid"
export default {
  title: "React spreadsheet import",
}

type Errors = { [id: string]: { [key: string]: Info } }
type Data = { [key: string]: string | number | boolean | null }[]

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

const theme = extendTheme(colorSchemeOverrides, themeOverrides)

const TableComponent = connect(() => {
  const data = [
    {
      id: "0",
      test: "Hello",
      second: "one",
      bool: true,
    },
    {
      id: "1",
      test: "123123",
      second: "two",
      bool: true,
    },
    {
      id: "2",
      test: "123123",
      second: null,
      bool: false,
    },
    {
      id: "3",
      test: "111",
      second: "two",
      bool: true,
    },
  ]

  const fields: Fields = [
    {
      key: "test",
      label: "Tests",
      fieldType: { type: "input" },
      validations: [
        {
          rule: "unique",
          errorMessage: "Test must be unique",
          level: "info",
        },
        {
          rule: "regex",
          value: "^\\d+$",
          errorMessage: "Test must be number",
          level: "warning",
        },
      ],
    },
    {
      key: "second",
      label: "Second",
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
          errorMessage: "Second is required",
        },
      ],
    },
    {
      key: "bool",
      label: "Bool",
      fieldType: { type: "checkbox" },
    },
  ]

  const runValidation = (data: Data): Errors => {
    let errors: Errors = {}
    fields.forEach((field) => {
      field.validations?.forEach((validation) => {
        switch (validation.rule) {
          case "unique": {
            const values = data.map((entry) => entry[field.key])
            values.forEach((value, index) => {
              if (values.indexOf(value) !== values.lastIndexOf(value)) {
                const entry = data[index]
                if (typeof entry?.id === "string") {
                  errors[entry.id] = {
                    ...errors[entry.id],
                    [field.key]: {
                      level: validation.level || "error",
                      message: validation.errorMessage || "Field must be unique",
                    },
                  }
                }
              }
            })
            break
          }
          case "required": {
            data.forEach((entry) => {
              if (entry[field.key] === null || entry[field.key] === undefined) {
                if (typeof entry.id === "string") {
                  errors[entry.id] = {
                    ...errors[entry.id],
                    [field.key]: {
                      level: validation.level || "error",
                      message: validation.errorMessage || "Field is required",
                    },
                  }
                }
              }
            })
            break
          }
          case "regex": {
            const regex = new RegExp(validation.value, validation.flags)
            data.forEach((entry) => {
              if (!entry[field.key]?.toString()?.match(regex)) {
                if (typeof entry.id === "string") {
                  errors[entry.id] = {
                    ...errors[entry.id],
                    [field.key]: {
                      level: validation.level || "error",
                      message:
                        validation.errorMessage ||
                        `Field did not match the regex /${validation.value}/${validation.flags} `,
                    },
                  }
                }
              }
            })
            break
          }
        }
      })
    })
    return errors
  }

  const state = useLape<{
    data: Data
    errorCount: number
    filterErrors: boolean
    errors: Errors
    selectedRows: ReadonlySet<number | string>
  }>({
    data: ignoreState(data),
    errorCount: 0,
    errors: runValidation(data),
    filterErrors: false,
    selectedRows: new Set(),
  })

  const updateRow = (rows: any[]) => {
    state.data = rows
    state.errors = runValidation(state.data)
  }
  const columns = [
    SelectColumn,
    ...fields.map((column: Field) => ({
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
      cellClass: (row: { _errors: any[] | null; id: string }) => {
        switch (state.errors[row.id]?.[column.key]?.level) {
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
  ]

  return (
    <EditableTable
      rowKeyGetter={(row) => row.id}
      rows={state.data}
      onRowsChange={updateRow}
      columns={columns}
      selectedRows={state.selectedRows}
      onSelectedRowsChange={(rows) => {
        state.selectedRows = rows
      }}
    />
  )
})

export const Table = () => (
  <ChakraProvider theme={theme}>
    <div style={{ blockSize: "calc(100vh - 32px)" }}>
      <TableComponent />
    </div>
  </ChakraProvider>
)
