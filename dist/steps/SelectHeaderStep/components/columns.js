import { jsx } from 'react/jsx-runtime';
import { useRowSelection } from 'react-data-grid';
import { Radio } from '@chakra-ui/react';

const SELECT_COLUMN_KEY = "select-row";
function SelectFormatter(props) {
    const [isRowSelected, onRowSelectionChange] = useRowSelection();
    return (jsx(Radio, { bg: "white", "aria-label": "Select", isChecked: isRowSelected, onChange: (event) => {
            onRowSelectionChange({
                row: props.row,
                checked: Boolean(event.target.checked),
                isShiftClick: event.nativeEvent.shiftKey,
            });
        } }));
}
const SelectColumn = {
    key: SELECT_COLUMN_KEY,
    name: "",
    width: 35,
    maxWidth: 35,
    resizable: false,
    sortable: false,
    frozen: true,
    cellClass: "rdg-radio",
    formatter: SelectFormatter,
};
const generateSelectionColumns = (data) => {
    const longestRowLength = data.reduce((acc, curr) => (acc > curr.length ? acc : curr.length), 0);
    return [
        SelectColumn,
        ...Array.from(Array(longestRowLength), (_, index) => ({
            key: index.toString(),
            name: "",
        })),
    ];
};

export { SelectColumn, generateSelectionColumns };
