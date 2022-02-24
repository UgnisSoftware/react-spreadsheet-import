import {
  Flex,
  Select,
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
import type { Fields } from "../../../types"

const SELECT_PLACEHOLDER = "Select column..."
const IGNORED_COLUMN_TEXT = "Column ignored"

const getAccordionTitle = (fields: Fields<any>, column: Column) => {
  const fieldLabel = fields.find((field) => "value" in column && field.key === column.value)!.label
  return `Match ${fieldLabel} (${"matchedOptions" in column && column.matchedOptions.length} Unmatched)`
}

type TemplateColumnProps = {
  onChange: (val: string, index: number) => void
  column: Column
}

export const TemplateColumn = ({ column, onChange }: TemplateColumnProps) => {
  const { fields } = useRsi()
  const isIgnored = column.type === ColumnType.ignored
  const isChecked = column.type === ColumnType.matched || column.type === ColumnType.matchedSelectOptions
  const isSelect = "matchedOptions" in column

  return (
    <Flex minH={10} w="100%" flexDir="column" justifyContent="center">
      {isIgnored ? (
        <Text fontSize="sm" lineHeight={5} fontWeight="normal" color="gray.400" px={4}>
          {IGNORED_COLUMN_TEXT}
        </Text>
      ) : (
        <>
          <Flex alignItems="center" minH={10} w="100%">
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
                        {getAccordionTitle(fields, column)}
                      </Text>
                    </Box>
                  </AccordionButton>
                  <AccordionPanel pb={4} display="flex" flexDir="column">
                    {column.matchedOptions.map((option) => (
                      <Box pl={2}>
                        <Text pt="0.375rem" pb={2} fontSize="md" lineHeight={6} fontWeight="medium" color="gray.700">
                          {option.entry}
                        </Text>
                        <Select pb="0.375rem">
                          {fields.map(({ label, key }) => (
                            <option value={key} key={key}>
                              {label}
                            </option>
                          ))}
                        </Select>
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
