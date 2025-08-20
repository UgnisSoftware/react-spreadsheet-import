import { Box, Text, useSlotRecipe } from "@chakra-ui/react"
import { getFieldOptions } from "@/steps/MatchColumnsStep/utils/getFieldOptions"
import { useRSIContext } from "@/contexts/RSIContext"
import { MatchedOptions, MatchedSelectColumn, MatchedSelectOptionsColumn } from "@/steps/types"
import { MatchColumnSelect } from "@/components/Selects/MatchColumnSelect"
import { SelectOption } from "@/types"

interface Props<T> {
  option: MatchedOptions<T> | Partial<MatchedOptions<T>>
  column: MatchedSelectColumn<T> | MatchedSelectOptionsColumn<T>
  onSubChange: (val: T, index: number, option: string) => void
}

export const SubMatchingSelect = <T extends string>({ option, column, onSubChange }: Props<T>) => {
  const { translations, fields } = useRSIContext<T>()

  const recipe = useSlotRecipe({ key: "matchColumnsStep" })
  const styles = recipe()

  const options = getFieldOptions(fields, column.value)
  const value = options.find((opt) => opt.value == option.value)

  return (
    <Box pl={2} pb="0.375rem">
      <Text css={styles.selectColumnSelectLabel}>{option.entry}</Text>
      <MatchColumnSelect
        value={value}
        placeholder={translations.matchColumnsStep.subSelectPlaceholder}
        onChange={(value) => onSubChange(value?.value as T, column.index, option.entry!)}
        options={options as SelectOption[]}
        name={option.entry}
      />
    </Box>
  )
}
