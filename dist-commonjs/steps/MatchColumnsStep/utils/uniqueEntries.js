'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var uniqBy = require('lodash/uniqBy');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var uniqBy__default = /*#__PURE__*/_interopDefaultLegacy(uniqBy);

const uniqueEntries = (data, index) => uniqBy__default["default"](data.map((row) => ({ entry: row[index] })), "entry").filter(({ entry }) => !!entry);

exports.uniqueEntries = uniqueEntries;
