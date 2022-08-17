'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react = require('@chakra-ui/react');
var MatchColumnSelect = require('../../../components/Selects/MatchColumnSelect.js');
var getFieldOptions = require('../utils/getFieldOptions.js');
var useRsi = require('../../../hooks/useRsi.js');

const SubMatchingSelect = ({ option, column, onSubChange }) => {
    const styles = react.useStyleConfig("MatchColumnsStep");
    const { translations, fields } = useRsi.useRsi();
    const options = getFieldOptions.getFieldOptions(fields, column.value);
    const value = options.find((opt) => opt.value == option.value);
    return (jsxRuntime.jsxs(react.Box, { pl: 2, pb: "0.375rem", children: [jsxRuntime.jsx(react.Text, { sx: styles.selectColumn.selectLabel, children: option.entry }), jsxRuntime.jsx(MatchColumnSelect.MatchColumnSelect, { value: value, placeholder: translations.matchColumnsStep.subSelectPlaceholder, onChange: (value) => onSubChange(value?.value, column.index, option.entry), options: options, name: option.entry })] }));
};

exports.SubMatchingSelect = SubMatchingSelect;
