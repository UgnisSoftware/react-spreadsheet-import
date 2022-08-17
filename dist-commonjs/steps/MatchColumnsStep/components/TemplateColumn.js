'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react = require('@chakra-ui/react');
var useRsi = require('../../../hooks/useRsi.js');
var MatchColumnsStep = require('../MatchColumnsStep.js');
var MatchIcon = require('./MatchIcon.js');
var MatchColumnSelect = require('../../../components/Selects/MatchColumnSelect.js');
var SubMatchingSelect = require('./SubMatchingSelect.js');

const getAccordionTitle = (fields, column, translations) => {
    const fieldLabel = fields.find((field) => "value" in column && field.key === column.value).label;
    return `${translations.matchColumnsStep.matchDropdownTitle} ${fieldLabel} (${"matchedOptions" in column && column.matchedOptions.length} ${translations.matchColumnsStep.unmatched})`;
};
const TemplateColumn = ({ column, onChange, onSubChange }) => {
    const { translations, fields } = useRsi.useRsi();
    const styles = react.useStyleConfig("MatchColumnsStep");
    const isIgnored = column.type === MatchColumnsStep.ColumnType.ignored;
    const isChecked = column.type === MatchColumnsStep.ColumnType.matched ||
        column.type === MatchColumnsStep.ColumnType.matchedCheckbox ||
        column.type === MatchColumnsStep.ColumnType.matchedSelectOptions;
    const isSelect = "matchedOptions" in column;
    const selectOptions = fields.map(({ label, key }) => ({ value: key, label }));
    const selectValue = selectOptions.find(({ value }) => "value" in column && column.value === value);
    return (jsxRuntime.jsx(react.Flex, { minH: 10, w: "100%", flexDir: "column", justifyContent: "center", children: isIgnored ? (jsxRuntime.jsx(react.Text, { sx: styles.selectColumn.text, children: translations.matchColumnsStep.ignoredColumnText })) : (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs(react.Flex, { alignItems: "center", minH: 10, w: "100%", children: [jsxRuntime.jsx(react.Box, { flex: 1, children: jsxRuntime.jsx(MatchColumnSelect.MatchColumnSelect, { placeholder: translations.matchColumnsStep.selectPlaceholder, value: selectValue, onChange: (value) => onChange(value?.value, column.index), options: selectOptions, name: column.header }) }), jsxRuntime.jsx(MatchIcon.MatchIcon, { isChecked: isChecked })] }), isSelect && (jsxRuntime.jsx(react.Flex, { width: "100%", children: jsxRuntime.jsx(react.Accordion, { allowMultiple: true, width: "100%", children: jsxRuntime.jsxs(react.AccordionItem, { border: "none", py: 1, children: [jsxRuntime.jsxs(react.AccordionButton, { _hover: { bg: "transparent" }, _focus: { boxShadow: "none" }, px: 0, py: 4, "data-testid": "accordion-button", children: [jsxRuntime.jsx(react.AccordionIcon, {}), jsxRuntime.jsx(react.Box, { textAlign: "left", children: jsxRuntime.jsx(react.Text, { sx: styles.selectColumn.accordionLabel, children: getAccordionTitle(fields, column, translations) }) })] }), jsxRuntime.jsx(react.AccordionPanel, { pb: 4, pr: 3, display: "flex", flexDir: "column", children: column.matchedOptions.map((option) => (jsxRuntime.jsx(SubMatchingSelect.SubMatchingSelect, { option: option, column: column, onSubChange: onSubChange }, option.entry))) })] }) }) }))] })) }));
};

exports.TemplateColumn = TemplateColumn;
