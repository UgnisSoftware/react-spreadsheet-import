import { Box, Flex, IconButton, Text } from "@chakra-ui/react"
import { CgClose, CgUndo } from "react-icons/cg"
import type { Column } from "../MatchColumnsStep"
import { ColumnType } from "../MatchColumnsStep"

type UserTableColumnProps<T extends string> = {
  column: Column<T>
  entries: string[]
  onIgnore: (index: number) => void
  onRevertIgnore: (index: number) => void
}

export const UserTableColumn = <T extends string>({
  column: { header, index, type },
  entries,
  onIgnore,
  onRevertIgnore,
}: UserTableColumnProps<T>) => {
  const textColor = type === ColumnType.ignored ? "gray.400" : "gray.700"
  return (
    <Box>
      <Flex px={6} justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="xs" lineHeight={4} fontWeight="bold" letterSpacing="wider" color={textColor}>
          {header}
        </Text>
        {type === ColumnType.ignored ? (
          <IconButton
            aria-label="Ignore column"
            icon={<CgUndo />}
            onClick={() => onRevertIgnore(index)}
            colorScheme="gray"
            size="xs"
          />
        ) : (
          <IconButton
            aria-label="Ignore column"
            icon={<CgClose />}
            onClick={() => onIgnore(index)}
            colorScheme="gray"
            size="xs"
          />
        )}
      </Flex>
      {entries.map((entry, index) => (
        <Text fontSize="sm" lineHeight={5} fontWeight="medium" px={6} py={4} key={entry + index} color={textColor}>
          {entry}
        </Text>
      ))}
    </Box>
  )
}
