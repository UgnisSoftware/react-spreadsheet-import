import {
  Flex,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  Box,
  AccordionPanel,
  useStyleConfig,
} from "@chakra-ui/react"
import { useRsi } from "../../../hooks/useRsi"
import type { Column } from "../MatchColumnsStep"
import { ColumnType, HeaderCustomFieldsMap } from "../MatchColumnsStep"
import { MatchIcon } from "./MatchIcon"
import type { Fields } from "../../../types"
import type { Translations } from "../../../translationsRSIProps"
import { MatchColumnSelect } from "../../../components/Selects/MatchColumnSelect"
import { SubMatchingSelect } from "./SubMatchingSelect"
import type { Styles } from "./ColumnGrid"
import { selectColumnCustomFields } from "../utils/customFields"

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
  headerCustomFieldsMap: HeaderCustomFieldsMap
}

export const TemplateColumn = <T extends string>({
  column,
  onChange,
  onSubChange,
  headerCustomFieldsMap,
}: TemplateColumnProps<T>) => {
  const { translations, fields: originalFields } = useRsi<T>()
  const styles = useStyleConfig("MatchColumnsStep") as Styles
  const customFields = selectColumnCustomFields(column, headerCustomFieldsMap)
  const fields = [...originalFields, ...customFields] as Fields<T>
  const isCustom = "value" in column && customFields.some((e) => e.key === column.value)
  const isIgnored = column.type === ColumnType.ignored
  const isChecked =
    column.type === ColumnType.matched ||
    column.type === ColumnType.matchedCheckbox ||
    column.type === ColumnType.matchedSelectOptions
  const isSelect = "matchedOptions" in column
  const selectOptions = fields.map(({ key, label, dropDownLabel }) => ({
    value: key,
    label: dropDownLabel ?? label,
  }))
  const selectValue = selectOptions.find(({ value }) => "value" in column && column.value === value)

  return (
    <Flex minH={10} w="100%" flexDir="column" justifyContent="center">
      {isIgnored ? (
        <Text sx={styles.selectColumn.text}>{translations.matchColumnsStep.ignoredColumnText}</Text>
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
            <MatchIcon isChecked={isChecked} isCustom={isCustom} />
          </Flex>
          {isSelect && (
            <Flex width="100%">
              <Accordion allowMultiple width="100%">
                <AccordionItem border="none" py={1}>
                  <AccordionButton
                    _hover={{ bg: "transparent" }}
                    _focus={{ boxShadow: "none" }}
                    px={0}
                    py={4}
                    data-testid="accordion-button"
                  >
                    <AccordionIcon />
                    <Box textAlign="left">
                      <Text sx={styles.selectColumn.accordionLabel}>
                        {getAccordionTitle<T>(fields, column, translations)}
                      </Text>
                    </Box>
                  </AccordionButton>
                  <AccordionPanel pb={4} pr={3} display="flex" flexDir="column">
                    {column.matchedOptions.map((option) => (
                      <SubMatchingSelect option={option} column={column} onSubChange={onSubChange} key={option.entry} />
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
