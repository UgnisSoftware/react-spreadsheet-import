import { Box, Flex, IconButton, Text, useSlotRecipe } from "@chakra-ui/react"
import { CgClose, CgUndo } from "react-icons/cg"
import type { RawData } from "@/types"
import { Column, ColumnType } from "@/steps/types"

type UserTableColumnProps<T extends string> = {
  column: Column<T>
  entries: RawData
  onIgnore: (index: number) => void
  onRevertIgnore: (index: number) => void
}

export const UserTableColumn = <T extends string>(props: UserTableColumnProps<T>) => {
  const recipe = useSlotRecipe({ key: "matchColumnsStep" })
  const styles = recipe()
  const {
    column: { header, index, type },
    entries,
    onIgnore,
    onRevertIgnore,
  } = props
  const isIgnored = type === ColumnType.ignored
  return (
    <Box>
      <Flex px={6} justifyContent="space-between" alignItems="center" mb={4}>
        <Text css={styles.userTableHeader} data-ignored={isIgnored ? "" : undefined}>
          {header}
        </Text>
        {type === ColumnType.ignored ? (
          <IconButton
            aria-label="Restore column"
            onClick={() => onRevertIgnore(index)}
            css={styles.userTableIgnoreButton}
            variant="subtle"
            size="2xs"
          >
            <CgUndo />
          </IconButton>
        ) : (
          <IconButton
            aria-label="Ignore column"
            onClick={() => onIgnore(index)}
            css={styles.userTableIgnoreButton}
            variant="subtle"
            size="2xs"
          >
            <CgClose />
          </IconButton>
        )}
      </Flex>
      {entries.map((entry, index) => (
        <Text key={(entry || "") + index} css={styles.userTableCell} data-ignored={isIgnored ? "" : undefined}>
          {entry}
        </Text>
      ))}
    </Box>
  )
}
