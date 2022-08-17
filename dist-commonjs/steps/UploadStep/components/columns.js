'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react = require('@chakra-ui/react');
var cg = require('react-icons/cg');

const generateColumns = (fields) => fields.map((column) => ({
    key: column.key,
    name: column.label,
    minWidth: 150,
    headerRenderer: () => (jsxRuntime.jsxs(react.Box, { display: "flex", gap: 1, alignItems: "center", position: "relative", children: [jsxRuntime.jsx(react.Box, { flex: 1, overflow: "hidden", textOverflow: "ellipsis", children: column.label }), column.description && (jsxRuntime.jsx(react.Tooltip, { placement: "top", hasArrow: true, label: column.description, children: jsxRuntime.jsx(react.Box, { flex: "0 0 auto", children: jsxRuntime.jsx(cg.CgInfo, { size: "1rem" }) }) }))] })),
    formatter: ({ row }) => (jsxRuntime.jsx(react.Box, { minWidth: "100%", minHeight: "100%", overflow: "hidden", textOverflow: "ellipsis", children: row[column.key] })),
}));

exports.generateColumns = generateColumns;
