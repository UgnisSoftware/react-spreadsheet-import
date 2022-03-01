import type { Column } from "react-data-grid"
import { Box, Tooltip } from "@chakra-ui/react"
import type { Field, Fields } from "../../../types"
import { CgInfo } from "react-icons/cg"

export const generateColumns = <T,>(fields: Fields<T>) =>
  fields.map(
    (column: Field<T>): Column<any> => ({
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
      formatter: ({ row }) => (
        <Box minWidth="100%" minHeight="100%" overflow="hidden" textOverflow="ellipsis">
          {row[column.key]}
        </Box>
      ),
    }),
  )
