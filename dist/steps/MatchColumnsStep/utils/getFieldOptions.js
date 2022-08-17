const getFieldOptions = (fields, fieldKey) => {
    const field = fields.find(({ key }) => fieldKey === key);
    return field.fieldType.type === "select" ? field.fieldType.options : [];
};

export { getFieldOptions };
