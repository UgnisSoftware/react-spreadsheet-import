import { Flex, Select, Text } from "@chakra-ui/react"
import { useRsi } from "../../../hooks/useRsi"
import type { Column } from "../MatchColumnsStep"
import { ColumnType } from "../MatchColumnsStep"
import { MatchIcon } from "./MatchIcon"

const SELECT_PLACEHOLDER = "Select column..."
const IGNORED_COLUMN_TEXT = "Column ignored"

type TemplateColumnProps = {
  onChange: (val: string, index: number) => void
  column: Column
}

export const TemplateColumn = ({ column, onChange }: TemplateColumnProps) => {
  const { fields } = useRsi()
  const isIgnored = column.type === ColumnType.ignored
  return (
    <Flex alignItems="center" minH={10}>
      {isIgnored ? (
        <Text fontSize="sm" lineHeight={5} fontWeight="normal" color="gray.400" px={4}>
          {IGNORED_COLUMN_TEXT}
        </Text>
      ) : (
        <>
          <Select
            placeholder={SELECT_PLACEHOLDER}
            value={"value" in column ? column.value : undefined}
            onChange={(event) => onChange(event.target.value, column.index)}
          >
            {fields.map(({ label, key }) => (
              <option value={key} key={key}>
                {label}
              </option>
            ))}
          </Select>
          <MatchIcon matched={"value" in column ? !!column.value : false} />
        </>
      )}
    </Flex>
  )
}
