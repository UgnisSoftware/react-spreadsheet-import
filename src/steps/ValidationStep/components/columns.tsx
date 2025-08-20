import { Column } from "react-data-grid"
import { Box, Flex, Input } from "@chakra-ui/react"
import type { Data, Fields, SelectOption } from "@/types"
import type { Meta } from "@/steps/types"
import { CgInfo } from "react-icons/cg"
import { Switch } from "@/components/ui/Switch"
import { TableSelect } from "@/components/Selects/TableSelect"
import { Tooltip } from "@/components/ui/Tooltip"
import { TableCheckmark } from "@/steps/ValidationStep/components/TableCheckmark"

const SELECT_COLUMN_KEY = "select-row"

function autoFocusAndSelect(input: HTMLInputElement | null) {
  input?.focus()
  input?.select()
}

export const generateColumns = <T extends string>(fields: Fields<T>): Column<Data<T> & Meta>[] => [
  {
    key: SELECT_COLUMN_KEY,
    name: "",
    width: 35,
    minWidth: 35,
    maxWidth: 35,
    resizable: false,
    sortable: false,
    frozen: true,
    cellClass: "rdg-checkbox",
    renderCell: (props) => <TableCheckmark {...props} />,
  },
  ...fields.map(
    (column): Column<Data<T> & Meta> => ({
      key: column.key,
      name: column.label,
      minWidth: 150,
      resizable: true,
      renderHeaderCell: () => (
        <Box display="flex" gap={1} alignItems="center" position="relative">
          <Box flex={1} overflow="hidden" textOverflow="ellipsis">
            {column.label}
          </Box>
          {column.description && (
            <Tooltip positioning={{ placement: "top" }} showArrow content={column.description}>
              <Box flex={"0 0 auto"}>
                <CgInfo size="16px" />
              </Box>
            </Tooltip>
          )}
        </Box>
      ),
      editable: column.fieldType.type !== "checkbox",
      renderEditCell: ({ row, onRowChange, onClose }) => {
        let component

        const cell = row[column.key] as string

        switch (column.fieldType.type) {
          case "select":
            component = (
              <TableSelect
                value={column.fieldType.options.find((option) => option.value === cell)}
                onChange={(value) => {
                  onRowChange({ ...row, [column.key]: value?.value }, true)
                }}
                options={column.fieldType.options as SelectOption[]}
              />
            )
            break
          default:
            component = (
              <Input
                ref={autoFocusAndSelect}
                autoFocus
                size="sm"
                unstyled
                outline="none"
                border="none"
                bgColor="transparent"
                value={cell}
                onChange={(event) => onRowChange({ ...row, [column.key]: event.target.value })}
                onBlur={() => onClose(true)}
              />
            )
        }

        return component
      },
      renderCell: ({ row, onRowChange }) => {
        let component

        switch (column.fieldType.type) {
          case "checkbox":
            component = (
              <Flex
                alignItems="center"
                height="100%"
                onClick={(event) => {
                  event.stopPropagation()
                }}
              >
                <Switch
                  checked={row[column.key] as boolean}
                  onChange={() => {
                    onRowChange({
                      ...row,
                      [column.key]: !row[column.key as T],
                    })
                  }}
                />
              </Flex>
            )
            break
          case "select":
            component = (
              <Flex alignItems="center" height="100%">
                {column.fieldType.options.find((option) => option.value === row[column.key as T])?.label || null}
              </Flex>
            )
            break
          default:
            component = (
              <Flex alignItems="center" height="100%">
                {row[column.key as T]}
              </Flex>
            )
        }

        if (row.__errors?.[column.key]) {
          return (
            <Tooltip positioning={{ placement: "top" }} showArrow content={row.__errors?.[column.key]?.message}>
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
