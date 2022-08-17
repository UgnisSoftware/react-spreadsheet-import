'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var MatchColumnsStep = require('../MatchColumnsStep.js');

const setIgnoreColumn = ({ header, index }) => ({
    header,
    index,
    type: MatchColumnsStep.ColumnType.ignored,
});

exports.setIgnoreColumn = setIgnoreColumn;
