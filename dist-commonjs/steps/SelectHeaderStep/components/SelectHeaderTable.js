'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var Table = require('../../../components/Table.js');
var columns = require('./columns.js');

const SelectHeaderTable = ({ data, selectedRows, setSelectedRows }) => {
    const columns$1 = react.useMemo(() => columns.generateSelectionColumns(data), [data]);
    return (jsxRuntime.jsx(Table.Table, { rowKeyGetter: (row) => data.indexOf(row), rows: data, columns: columns$1, selectedRows: selectedRows, onSelectedRowsChange: (newRows) => {
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

exports.SelectHeaderTable = SelectHeaderTable;
