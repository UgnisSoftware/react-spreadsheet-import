import type { Column } from "./MatchColumns"
import { Flex, Select } from "@chakra-ui/react"
import { useRsi } from "../hooks/useRsi"
import { MatchIcon } from "./MatchIcon"

const SELECT_PLACEHOLDER = "Select column..."

type TemplateColumnProps = {
  onChange: (val: string, index: number) => void
  column: Column
}

export const TemplateColumn = ({ column, onChange }: TemplateColumnProps) => {
  const { fields } = useRsi()
  return (
    <Flex alignItems='center'>
      <Select
        placeholder={SELECT_PLACEHOLDER}
        value={"value" in column ? column.value : undefined}
        onChange={(event) => onChange(event.target.value, column.index)}
      >
        {fields.map(({ label, key }) => (
          <option value={key}>{label}</option>
        ))}
      </Select>
      <MatchIcon matched={"value" in column ? !!column.value : false} />
    </Flex>
  )
}
