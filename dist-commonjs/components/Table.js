'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var DataGrid = require('react-data-grid');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var DataGrid__default = /*#__PURE__*/_interopDefaultLegacy(DataGrid);

const Table = ({ className, ...props }) => {
    return jsxRuntime.jsx(DataGrid__default["default"], { className: "rdg-light " + className || "", ...props });
};

exports.Table = Table;
