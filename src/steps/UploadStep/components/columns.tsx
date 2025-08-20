import type { Column } from "react-data-grid"
import type { Fields } from "@/types"
import { CgInfo } from "react-icons/cg"
import { Box } from "@chakra-ui/react"
import { Tooltip } from "@/components/ui/Tooltip"

export const generateColumns = <T extends string>(fields: Fields<T>) =>
  fields.map(
    (column): Column<Record<string, string>> => ({
      key: column.key,
      name: column.label,
      minWidth: 150,
      renderHeaderCell: () => (
        <Box display="flex" gap={1} alignItems="center" position="relative">
          <Box flex={1} overflow="hidden" textOverflow="ellipsis">
            {column.label}
          </Box>
          {column.description && (
            <Tooltip showArrow positioning={{ placement: "top" }} content={column.description}>
              <Box flex={"0 0 auto"}>
                <CgInfo size="16px" />
              </Box>
            </Tooltip>
          )}
        </Box>
      ),
      renderCell: ({ row }) => (
        <Box minWidth="100%" minHeight="100%" overflow="hidden" textOverflow="ellipsis">
          {row[column.key]}
        </Box>
      ),
    }),
  )
