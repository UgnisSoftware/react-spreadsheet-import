import { jsxs, jsx } from 'react/jsx-runtime';
import { useStyleConfig, Box, Text } from '@chakra-ui/react';
import { MatchColumnSelect } from '../../../components/Selects/MatchColumnSelect.js';
import { getFieldOptions } from '../utils/getFieldOptions.js';
import { useRsi } from '../../../hooks/useRsi.js';

const SubMatchingSelect = ({ option, column, onSubChange }) => {
    const styles = useStyleConfig("MatchColumnsStep");
    const { translations, fields } = useRsi();
    const options = getFieldOptions(fields, column.value);
    const value = options.find((opt) => opt.value == option.value);
    return (jsxs(Box, { pl: 2, pb: "0.375rem", children: [jsx(Text, { sx: styles.selectColumn.selectLabel, children: option.entry }), jsx(MatchColumnSelect, { value: value, placeholder: translations.matchColumnsStep.subSelectPlaceholder, onChange: (value) => onSubChange(value?.value, column.index, option.entry), options: options, name: option.entry })] }));
};

export { SubMatchingSelect };
