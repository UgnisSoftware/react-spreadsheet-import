const titleMap = {
    checkbox: "Boolean",
    select: "Options",
    input: "Text",
};
const generateExampleRow = (fields) => [
    fields.reduce((acc, field) => {
        acc[field.key] = field.example || titleMap[field.fieldType.type];
        return acc;
    }, {}),
];

export { generateExampleRow };
