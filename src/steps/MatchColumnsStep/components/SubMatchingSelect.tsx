import { Box, Text } from "@chakra-ui/react"
import { MatchColumnSelect } from "../../../components/Selects/MatchColumnSelect"
import { getFieldOptions } from "../utils/getFieldOptions"
import { useRsi } from "../../../hooks/useRsi"
import type { MatchedOptions, MatchedSelectColumn } from "../MatchColumnsStep"
import { Column } from "../MatchColumnsStep"

interface Props<T> {
  option: MatchedOptions<T> | Partial<MatchedOptions<T>>
  column: MatchedSelectColumn<T>
  onSubChange: (val: T, index: number, option: string) => void
}

export const SubMatchingSelect = <T extends string>({ option, column, onSubChange }: Props<T>) => {
  const { translations, fields } = useRsi<T>()
  const options = getFieldOptions(fields, column.value)
  const value = options.find((opt) => opt.value == option.value)

  return (
    <Box pl={2} pb="0.375rem">
      <Text pt="0.375rem" pb={2} fontSize="md" lineHeight={6} fontWeight="medium" color="gray.700">
        {option.entry}
      </Text>
      <MatchColumnSelect
        value={value}
        placeholder={translations.matchColumnsStep.subSelectPlaceholder}
        onChange={(value) => onSubChange(value?.value as T, column.index, option.entry!)}
        options={options}
      />
    </Box>
  )
}
