'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var MatchColumnsStep = require('../MatchColumnsStep.js');
var uniqueEntries = require('./uniqueEntries.js');

const setColumn = (oldColumn, field, data) => {
    switch (field?.fieldType.type) {
        case "select":
            return {
                ...oldColumn,
                type: MatchColumnsStep.ColumnType.matchedSelect,
                value: field.key,
                matchedOptions: uniqueEntries.uniqueEntries(data || [], oldColumn.index),
            };
        case "checkbox":
            return { index: oldColumn.index, type: MatchColumnsStep.ColumnType.matchedCheckbox, value: field.key, header: oldColumn.header };
        case "input":
            return { index: oldColumn.index, type: MatchColumnsStep.ColumnType.matched, value: field.key, header: oldColumn.header };
        default:
            return { index: oldColumn.index, header: oldColumn.header, type: MatchColumnsStep.ColumnType.empty };
    }
};

exports.setColumn = setColumn;
