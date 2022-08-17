'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const booleanWhitelist = {
    yes: true,
    no: false,
    true: true,
    false: false,
};
const normalizeCheckboxValue = (value) => {
    if (value && value.toLowerCase() in booleanWhitelist) {
        return booleanWhitelist[value.toLowerCase()];
    }
    return false;
};

exports.normalizeCheckboxValue = normalizeCheckboxValue;
