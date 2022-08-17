'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var MatchColumnsStep = require('../MatchColumnsStep.js');
var normalizeCheckboxValue = require('./normalizeCheckboxValue.js');

const normalizeTableData = (columns, data, fields) => data.map((row) => columns.reduce((acc, column, index) => {
    const curr = row[index];
    switch (column.type) {
        case MatchColumnsStep.ColumnType.matchedCheckbox: {
            const field = fields.find((field) => field.key === column.value);
            if ("booleanMatches" in field.fieldType && Object.keys(field.fieldType).length) {
                const booleanMatchKey = Object.keys(field.fieldType.booleanMatches || []).find((key) => key.toLowerCase() === curr?.toLowerCase());
                const booleanMatch = field.fieldType.booleanMatches?.[booleanMatchKey];
                acc[column.value] = booleanMatchKey ? booleanMatch : normalizeCheckboxValue.normalizeCheckboxValue(curr);
            }
            else {
                acc[column.value] = normalizeCheckboxValue.normalizeCheckboxValue(curr);
            }
            return acc;
        }
        case MatchColumnsStep.ColumnType.matched: {
            acc[column.value] = curr === "" ? undefined : curr;
            return acc;
        }
        case MatchColumnsStep.ColumnType.matchedSelect:
        case MatchColumnsStep.ColumnType.matchedSelectOptions: {
            const matchedOption = column.matchedOptions.find(({ entry, value }) => entry === curr);
            acc[column.value] = matchedOption?.value || undefined;
            return acc;
        }
        case MatchColumnsStep.ColumnType.empty:
        case MatchColumnsStep.ColumnType.ignored: {
            return acc;
        }
        default:
            return acc;
    }
}, {}));

exports.normalizeTableData = normalizeTableData;
