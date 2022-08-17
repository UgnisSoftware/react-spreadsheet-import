import { jsx } from 'react/jsx-runtime';
import { rootId } from '../Providers.js';
import { Select } from 'chakra-react-select';
import { useStyleConfig } from '@chakra-ui/react';

const TableSelect = ({ onChange, value, options }) => {
    const styles = useStyleConfig("ValidationStep");
    return (jsx(Select, { autoFocus: true, size: "sm", value: value, onChange: onChange, placeholder: " ", closeMenuOnScroll: true, menuPosition: "fixed", menuIsOpen: true, menuPortalTarget: document.getElementById(rootId), options: options, chakraStyles: styles.select }));
};

export { TableSelect };
