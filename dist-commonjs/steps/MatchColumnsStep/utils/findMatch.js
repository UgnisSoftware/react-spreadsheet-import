'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var lavenstein = require('js-levenshtein');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var lavenstein__default = /*#__PURE__*/_interopDefaultLegacy(lavenstein);

const findMatch = (header, fields, autoMapDistance) => {
    const smallestValue = fields.reduce((acc, field) => {
        const distance = Math.min(...[
            lavenstein__default["default"](field.key, header),
            ...(field.alternateMatches?.map((alternate) => lavenstein__default["default"](alternate, header)) || []),
        ]);
        return distance < acc.distance || acc.distance === undefined
            ? { value: field.key, distance }
            : acc;
    }, {});
    return smallestValue.distance <= autoMapDistance ? smallestValue.value : undefined;
};

exports.findMatch = findMatch;
