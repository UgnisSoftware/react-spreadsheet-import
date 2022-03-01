import { Column, FormatterProps, useRowSelection } from "react-data-grid"
import { Box, Checkbox, Input, Select, Switch, Tooltip } from "@chakra-ui/react"
import type { Field, Fields } from "../../../types"
import type { ChangeEvent } from "react"
import type { Meta } from "../types"
import { CgInfo } from "react-icons/cg"
import type { DeepReadonly } from "ts-essentials"

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

export const generateColumns = <T extends string>(fields: DeepReadonly<Fields<T>>) => [
  SelectColumn,
  ...fields.map(
    (column): Column<T & Meta> => ({
      key: column.key,
      name: column.label,
      resizable: true,
      headerRenderer: () => (
        <Box display="flex" gap={1} alignItems="center" position="relative">
          {column.label}
          {column.description && (
            <Tooltip placement="top" hasArrow label={column.description}>
              <span>
                <CgInfo size="1rem" />
              </span>
            </Tooltip>
          )}
        </Box>
      ),
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
                <option value={option.value} key={option.value}>
                  {option.label}
                </option>
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
      formatter: ({ row, onRowChange }) => {
        let component

        switch (column.fieldType.type) {
          case "checkbox":
            component = (
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
            )
            break
          case "select":
            component = (
              <Box minWidth="100%" minHeight="100%" overflow="hidden" textOverflow="ellipsis">
                {column.fieldType.options.find((option) => option.value === row[column.key])?.label || null}
              </Box>
            )
            break
          default:
            component = (
              <Box minWidth="100%" minHeight="100%" overflow="hidden" textOverflow="ellipsis">
                {row[column.key]}
              </Box>
            )
        }

        if (row.__errors?.[column.key]) {
          return (
            <Tooltip placement="top" hasArrow label={row.__errors?.[column.key]?.message}>
              {component}
            </Tooltip>
          )
        }

        return component
      },
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
