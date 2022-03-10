import {
  Flex,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  Box,
  AccordionPanel,
} from "@chakra-ui/react"
import { useRsi } from "../../../hooks/useRsi"
import type { Column } from "../MatchColumnsStep"
import { ColumnType } from "../MatchColumnsStep"
import { MatchIcon } from "./MatchIcon"
import { getFieldOptions } from "../utils/getFieldOptions"
import type { Fields } from "../../../types"
import type { Translations } from "../../../translationsRSIProps"
import { MatchColumnSelect } from "../../../components/Selects/MatchColumnSelect"

const getAccordionTitle = <T extends string>(fields: Fields<T>, column: Column<T>, translations: Translations) => {
  const fieldLabel = fields.find((field) => "value" in column && field.key === column.value)!.label
  return `${translations.matchColumnsStep.matchDropdownTitle} ${fieldLabel} (${
    "matchedOptions" in column && column.matchedOptions.length
  } ${translations.matchColumnsStep.unmatched})`
}

type TemplateColumnProps<T extends string> = {
  onChange: (val: T, index: number) => void
  onSubChange: (val: T, index: number, option: string) => void
  column: Column<T>
}

export const TemplateColumn = <T extends string>({ column, onChange, onSubChange }: TemplateColumnProps<T>) => {
  const { translations, fields } = useRsi<T>()
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
        <Text fontSize="sm" lineHeight={5} fontWeight="normal" color="gray.400" px={4}>
          {translations.matchColumnsStep.ignoredColumnText}
        </Text>
      ) : (
        <>
          <Flex alignItems="center" minH={10} w="100%">
            <Box flex={1} pl={2}>
              <MatchColumnSelect
                placeholder={translations.matchColumnsStep.selectPlaceholder}
                value={selectValue}
                onChange={(value) => onChange(value?.value as T, column.index)}
                options={selectOptions}
              />
            </Box>
            <MatchIcon isChecked={isChecked} />
          </Flex>
          {isSelect && (
            <Flex width="100%">
              <Accordion allowMultiple width="100%">
                <AccordionItem border="none" py={1}>
                  <AccordionButton _hover={{ bg: "transparent" }} _focus={{ boxShadow: "none" }} px={0} py={4}>
                    <AccordionIcon />
                    <Box textAlign="left">
                      <Text color="blue.600" fontSize="sm" lineHeight={5} pl={1}>
                        {getAccordionTitle<T>(fields, column, translations)}
                      </Text>
                    </Box>
                  </AccordionButton>
                  <AccordionPanel pb={4} display="flex" flexDir="column">
                    {column.matchedOptions.map((option) => (
                      <Box pl={2} pb="0.375rem">
                        <Text pt="0.375rem" pb={2} fontSize="md" lineHeight={6} fontWeight="medium" color="gray.700">
                          {option.entry}
                        </Text>
                        <MatchColumnSelect
                          placeholder={translations.matchColumnsStep.subSelectPlaceholder}
                          onChange={(value) => onSubChange(value?.value as T, column.index, option.entry!)}
                          options={getFieldOptions(fields, column.value)}
                        />
                      </Box>
                    ))}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Flex>
          )}
        </>
      )}
    </Flex>
  )
}
