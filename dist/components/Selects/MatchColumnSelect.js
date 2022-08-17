import { jsx } from 'react/jsx-runtime';
import { Select } from 'chakra-react-select';
import { customComponents } from './MenuPortal.js';
import { useStyleConfig } from '@chakra-ui/react';

const MatchColumnSelect = ({ onChange, value, options, placeholder, name }) => {
    const styles = useStyleConfig("MatchColumnsStep");
    return (jsx(Select, { value: value || null, colorScheme: "gray", onChange: onChange, placeholder: placeholder, options: options, chakraStyles: styles.select, menuPosition: "fixed", components: customComponents, "aria-label": name }));
};

export { MatchColumnSelect };
