import type { Column } from "react-data-grid"
import { Box } from "@chakra-ui/react"
import type { Field, Fields } from "../../../types"

export const generateColumns = <T,>(fields: Fields<T>) =>
  fields.map(
    (column: Field<T>): Column<any> => ({
      key: column.key,
      name: column.label,
      resizable: true,
      formatter: ({ row }) => (
        <Box minWidth="100%" minHeight="100%" overflow="hidden" textOverflow="ellipsis">
          {row[column.key]}
        </Box>
      ),
    }),
  )
