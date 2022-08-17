'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var XLSX = require('xlsx');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var XLSX__namespace = /*#__PURE__*/_interopNamespace(XLSX);

const mapWorkbook = (workbook, sheetName) => {
    const worksheet = workbook.Sheets[sheetName || workbook.SheetNames[0]];
    const data = XLSX__namespace.utils.sheet_to_json(worksheet, {
        header: 1,
        blankrows: false,
        raw: false,
    });
    return data;
};

exports.mapWorkbook = mapWorkbook;
