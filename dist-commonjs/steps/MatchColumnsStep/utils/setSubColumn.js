'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var MatchColumnsStep = require('../MatchColumnsStep.js');

const setSubColumn = (oldColumn, entry, value) => {
    const options = oldColumn.matchedOptions.map((option) => (option.entry === entry ? { ...option, value } : option));
    const allMathced = options.every(({ value }) => !!value);
    if (allMathced) {
        return { ...oldColumn, matchedOptions: options, type: MatchColumnsStep.ColumnType.matchedSelectOptions };
    }
    else {
        return { ...oldColumn, matchedOptions: options, type: MatchColumnsStep.ColumnType.matchedSelect };
    }
};

exports.setSubColumn = setSubColumn;
