'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const getFieldOptions = (fields, fieldKey) => {
    const field = fields.find(({ key }) => fieldKey === key);
    return field.fieldType.type === "select" ? field.fieldType.options : [];
};

exports.getFieldOptions = getFieldOptions;
