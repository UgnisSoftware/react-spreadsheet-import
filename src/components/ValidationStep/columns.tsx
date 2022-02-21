import { Column, FormatterProps, useRowSelection } from "react-data-grid"
import { Box, Checkbox, Input, Select, Switch } from "@chakra-ui/react"
import type { Field, Fields } from "../../types"
import type { ChangeEvent } from "react"
import type { Data, Meta } from "./types"

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

export const SelectColumn: Column<any, any> = {
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

export const generateColumns = <T,>(fields: Fields<T>) => [
  SelectColumn,
  ...fields.map(
    (column: Field<T>): Column<T & Data & Meta> => ({
      key: column.key,
      name: column.label,
      resizable: true,
      editable: column.fieldType.type !== "checkbox",
      editor: ({ row, onRowChange, onClose }) =>
        column.fieldType.type === "select" ? (
          <Box pl="0.5rem">
            <Select
              variant="unstyled"
              autoFocus
              size="small"
              value={row[column.key] as string}
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
              value={row[column.key] as string}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                onRowChange({ ...row, [column.key]: event.target.value })
              }}
              onBlur={() => onClose(true)}
            />
          </Box>
        ),
      editorOptions: {
        editOnClick: true,
      },
      formatter: ({ row, onRowChange }) =>
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
              isChecked={row[column.key] as boolean}
              onChange={() => {
                onRowChange({ ...row, [column.key]: !row[column.key] })
              }}
            />
          </Box>
        ) : column.fieldType.type === "select" ? (
          <div>{column.fieldType.options.find((option) => option.value === row[column.key])?.label || null}</div>
        ) : (
          <div>{row[column.key]}</div>
        ),
      cellClass: (row: Meta) => {
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
    }),
  ),
]
