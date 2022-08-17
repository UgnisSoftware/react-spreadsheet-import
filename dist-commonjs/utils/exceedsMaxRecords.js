'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const exceedsMaxRecords = (workSheet, maxRecords) => {
    const [top, bottom] = workSheet["!ref"]?.split(":").map((position) => parseInt(position.replace(/\D/g, ""), 10)) || [];
    return bottom - top > maxRecords;
};

exports.exceedsMaxRecords = exceedsMaxRecords;
