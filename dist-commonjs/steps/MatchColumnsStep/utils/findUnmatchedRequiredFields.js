'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const findUnmatchedRequiredFields = (fields, columns) => fields
    .filter((field) => field.validations?.some((validation) => validation.rule === "required"))
    .filter((field) => columns.findIndex((column) => "value" in column && column.value === field.key) === -1)
    .map((field) => field.label) || [];

exports.findUnmatchedRequiredFields = findUnmatchedRequiredFields;
