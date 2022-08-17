import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useStyleConfig, Flex, Text, Box, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from '@chakra-ui/react';
import { useRsi } from '../../../hooks/useRsi.js';
import { ColumnType } from '../MatchColumnsStep.js';
import { MatchIcon } from './MatchIcon.js';
import { MatchColumnSelect } from '../../../components/Selects/MatchColumnSelect.js';
import { SubMatchingSelect } from './SubMatchingSelect.js';

const getAccordionTitle = (fields, column, translations) => {
    const fieldLabel = fields.find((field) => "value" in column && field.key === column.value).label;
    return `${translations.matchColumnsStep.matchDropdownTitle} ${fieldLabel} (${"matchedOptions" in column && column.matchedOptions.length} ${translations.matchColumnsStep.unmatched})`;
};
const TemplateColumn = ({ column, onChange, onSubChange }) => {
    const { translations, fields } = useRsi();
    const styles = useStyleConfig("MatchColumnsStep");
    const isIgnored = column.type === ColumnType.ignored;
    const isChecked = column.type === ColumnType.matched ||
        column.type === ColumnType.matchedCheckbox ||
        column.type === ColumnType.matchedSelectOptions;
    const isSelect = "matchedOptions" in column;
    const selectOptions = fields.map(({ label, key }) => ({ value: key, label }));
    const selectValue = selectOptions.find(({ value }) => "value" in column && column.value === value);
    return (jsx(Flex, { minH: 10, w: "100%", flexDir: "column", justifyContent: "center", children: isIgnored ? (jsx(Text, { sx: styles.selectColumn.text, children: translations.matchColumnsStep.ignoredColumnText })) : (jsxs(Fragment, { children: [jsxs(Flex, { alignItems: "center", minH: 10, w: "100%", children: [jsx(Box, { flex: 1, children: jsx(MatchColumnSelect, { placeholder: translations.matchColumnsStep.selectPlaceholder, value: selectValue, onChange: (value) => onChange(value?.value, column.index), options: selectOptions, name: column.header }) }), jsx(MatchIcon, { isChecked: isChecked })] }), isSelect && (jsx(Flex, { width: "100%", children: jsx(Accordion, { allowMultiple: true, width: "100%", children: jsxs(AccordionItem, { border: "none", py: 1, children: [jsxs(AccordionButton, { _hover: { bg: "transparent" }, _focus: { boxShadow: "none" }, px: 0, py: 4, "data-testid": "accordion-button", children: [jsx(AccordionIcon, {}), jsx(Box, { textAlign: "left", children: jsx(Text, { sx: styles.selectColumn.accordionLabel, children: getAccordionTitle(fields, column, translations) }) })] }), jsx(AccordionPanel, { pb: 4, pr: 3, display: "flex", flexDir: "column", children: column.matchedOptions.map((option) => (jsx(SubMatchingSelect, { option: option, column: column, onSubChange: onSubChange }, option.entry))) })] }) }) }))] })) }));
};

export { TemplateColumn };
