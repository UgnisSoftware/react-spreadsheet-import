import { jsx, jsxs } from 'react/jsx-runtime';
import { useRowSelection } from 'react-data-grid';
import { Checkbox, Box, Tooltip, Input, Switch } from '@chakra-ui/react';
import { CgInfo } from 'react-icons/cg';
import { TableSelect } from '../../../components/Selects/TableSelect.js';

const SELECT_COLUMN_KEY = "select-row";
function autoFocusAndSelect(input) {
    input?.focus();
    input?.select();
}
const generateColumns = (fields) => [
    {
        key: SELECT_COLUMN_KEY,
        name: "",
        width: 35,
        maxWidth: 35,
        resizable: false,
        sortable: false,
        frozen: true,
        cellClass: "rdg-checkbox",
        formatter: (props) => {
            // eslint-disable-next-line  react-hooks/rules-of-hooks
            const [isRowSelected, onRowSelectionChange] = useRowSelection();
            return (jsx(Checkbox, { bg: "white", "aria-label": "Select", isChecked: isRowSelected, onChange: (event) => {
                    onRowSelectionChange({
                        row: props.row,
                        checked: Boolean(event.target.checked),
                        isShiftClick: event.nativeEvent.shiftKey,
                    });
                } }));
        },
    },
    ...fields.map((column) => ({
        key: column.key,
        name: column.label,
        minWidth: 150,
        resizable: true,
        headerRenderer: () => (jsxs(Box, { display: "flex", gap: 1, alignItems: "center", position: "relative", children: [jsx(Box, { flex: 1, overflow: "hidden", textOverflow: "ellipsis", children: column.label }), column.description && (jsx(Tooltip, { placement: "top", hasArrow: true, label: column.description, children: jsx(Box, { flex: "0 0 auto", children: jsx(CgInfo, { size: "1rem" }) }) }))] })),
        editable: column.fieldType.type !== "checkbox",
        editor: ({ row, onRowChange, onClose }) => {
            let component;
            switch (column.fieldType.type) {
                case "select":
                    component = (jsx(TableSelect, { value: column.fieldType.options.find((option) => option.value === row[column.key]), onChange: (value) => {
                            onRowChange({ ...row, [column.key]: value?.value }, true);
                        }, options: column.fieldType.options }));
                    break;
                default:
                    component = (jsx(Box, { pl: "0.5rem", children: jsx(Input, { ref: autoFocusAndSelect, variant: "unstyled", autoFocus: true, size: "small", value: row[column.key], onChange: (event) => {
                                onRowChange({ ...row, [column.key]: event.target.value });
                            }, onBlur: () => onClose(true) }) }));
            }
            return component;
        },
        editorOptions: {
            editOnClick: true,
        },
        formatter: ({ row, onRowChange }) => {
            let component;
            switch (column.fieldType.type) {
                case "checkbox":
                    component = (jsx(Box, { display: "flex", alignItems: "center", height: "100%", onClick: (event) => {
                            event.stopPropagation();
                        }, children: jsx(Switch, { isChecked: row[column.key], onChange: () => {
                                onRowChange({ ...row, [column.key]: !row[column.key] });
                            } }) }));
                    break;
                case "select":
                    component = (jsx(Box, { minWidth: "100%", minHeight: "100%", overflow: "hidden", textOverflow: "ellipsis", children: column.fieldType.options.find((option) => option.value === row[column.key])?.label || null }));
                    break;
                default:
                    component = (jsx(Box, { minWidth: "100%", minHeight: "100%", overflow: "hidden", textOverflow: "ellipsis", children: row[column.key] }));
            }
            if (row.__errors?.[column.key]) {
                return (jsx(Tooltip, { placement: "top", hasArrow: true, label: row.__errors?.[column.key]?.message, children: component }));
            }
            return component;
        },
        cellClass: (row) => {
            switch (row.__errors?.[column.key]?.level) {
                case "error":
                    return "rdg-cell-error";
                case "warning":
                    return "rdg-cell-warning";
                case "info":
                    return "rdg-cell-info";
                default:
                    return "";
            }
        },
    })),
];

export { generateColumns };
