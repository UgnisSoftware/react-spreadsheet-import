import { jsx } from 'react/jsx-runtime';
import { useMemo } from 'react';
import { Table } from '../../../components/Table.js';
import { generateSelectionColumns } from './columns.js';

const SelectHeaderTable = ({ data, selectedRows, setSelectedRows }) => {
    const columns = useMemo(() => generateSelectionColumns(data), [data]);
    return (jsx(Table, { rowKeyGetter: (row) => data.indexOf(row), rows: data, columns: columns, selectedRows: selectedRows, onSelectedRowsChange: (newRows) => {
            // allow selecting only one row
            newRows.forEach((value) => {
                if (!selectedRows.has(value)) {
                    setSelectedRows(new Set([value]));
                    return;
                }
            });
        }, onRowClick: (row) => {
            setSelectedRows(new Set([data.indexOf(row)]));
        }, headerRowHeight: 0, className: "rdg-static" }));
};

export { SelectHeaderTable };
