'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var Table = require('../../../components/Table.js');
var columns = require('./columns.js');
var generateExampleRow = require('../utils/generateExampleRow.js');

const ExampleTable = ({ fields }) => {
    const data = react.useMemo(() => generateExampleRow.generateExampleRow(fields), [fields]);
    const columns$1 = react.useMemo(() => columns.generateColumns(fields), [fields]);
    return jsxRuntime.jsx(Table.Table, { rows: data, columns: columns$1, className: "rdg-example" });
};

exports.ExampleTable = ExampleTable;
