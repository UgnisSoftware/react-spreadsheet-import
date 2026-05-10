import { Flex, Text, Box, useSlotRecipe, Accordion } from "@chakra-ui/react"
import type { Fields } from "@/types"
import { useRSIContext } from "@/contexts/RSIContext"
import { Column, ColumnType } from "@/steps/types"
import { MatchColumnSelect } from "@/components/Selects/MatchColumnSelect"
import { MatchIcon } from "@/steps/MatchColumnsStep/components/MatchIcon"
import { Translations } from "@/translations"
import { SubMatchingSelect } from "@/steps/MatchColumnsStep/components/SubMatchingSelect"

const getAccordionTitle = <T extends string>(fields: Fields<T>, column: Column<T>, translations: Translations) => {
  const fieldLabel = fields.find((field) => "value" in column && field.key === column.value)!.label
  return `${translations.matchColumnsStep.matchDropdownTitle} ${fieldLabel} (${
    "matchedOptions" in column && column.matchedOptions.filter((option) => !option.value).length
  } ${translations.matchColumnsStep.unmatched})`
}

type TemplateColumnProps<T extends string> = {
  onChange: (val: T, index: number) => void
  onSubChange: (val: T, index: number, option: string) => void
  column: Column<T>
}

export const TemplateColumn = <T extends string>({ column, onChange, onSubChange }: TemplateColumnProps<T>) => {
  const { translations, fields } = useRSIContext<T>()

  const recipe = useSlotRecipe({ key: "matchColumnsStep" })
  const styles = recipe()

  const isIgnored = column.type === ColumnType.ignored
  const isChecked =
    column.type === ColumnType.matched ||
    column.type === ColumnType.matchedCheckbox ||
    column.type === ColumnType.matchedSelectOptions
  const isSelect = "matchedOptions" in column
  const selectOptions = fields.map(({ label, key }) => ({ value: key, label }))
  const selectValue = selectOptions.find(({ value }) => "value" in column && column.value === value)

  return (
    <Flex minH={10} w="100%" flexDir="column" justifyContent="center">
      {isIgnored ? (
        <Text css={styles.selectColumnText}>{translations.matchColumnsStep.ignoredColumnText}</Text>
      ) : (
        <>
          <Flex alignItems="center" minH={10} w="100%">
            <Box flex={1}>
              <MatchColumnSelect
                placeholder={translations.matchColumnsStep.selectPlaceholder}
                value={selectValue}
                onChange={(value) => onChange(value?.value as T, column.index)}
                options={selectOptions}
                name={column.header}
              />
            </Box>
            <MatchIcon isChecked={isChecked} />
          </Flex>
          {isSelect && (
            <Flex width="100%">
              <Accordion.Root collapsible defaultValue={["sub-matching"]} variant="plain">
                <Accordion.Item value="sub-matching">
                  <Accordion.ItemTrigger data-testid="accordion-button">
                    <Accordion.ItemIndicator />
                    <Box textAlign="left">
                      <Text css={styles.selectColumnAccordionLabel}>
                        {getAccordionTitle<T>(fields, column, translations)}
                      </Text>
                    </Box>
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent>
                    <Accordion.ItemBody>
                      {column.matchedOptions.map((option) => (
                        <SubMatchingSelect
                          option={option}
                          column={column}
                          onSubChange={onSubChange}
                          key={option.entry}
                        />
                      ))}
                    </Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>
              </Accordion.Root>
            </Flex>
          )}
        </>
      )}
    </Flex>
  )
}
