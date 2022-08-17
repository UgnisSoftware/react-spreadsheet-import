import { v4 } from 'uuid';

const addErrorsAndRunHooks = (data, fields, rowHook, tableHook) => {
    const errors = {};
    const addHookError = (rowIndex, fieldKey, error) => {
        errors[rowIndex] = {
            ...errors[rowIndex],
            [fieldKey]: error,
        };
    };
    if (tableHook) {
        data = tableHook(data, addHookError);
    }
    if (rowHook) {
        data = data.map((value, index) => rowHook(value, (...props) => addHookError(index, ...props), data));
    }
    fields.forEach((field) => {
        field.validations?.forEach((validation) => {
            switch (validation.rule) {
                case "unique": {
                    const values = data.map((entry) => entry[field.key]);
                    const taken = new Set(); // Set of items used at least once
                    const duplicates = new Set(); // Set of items used multiple times
                    values.forEach((value) => {
                        if (validation.allowEmpty && !value) {
                            // If allowEmpty is set, we will not validate falsy fields such as undefined or empty string.
                            return;
                        }
                        if (taken.has(value)) {
                            duplicates.add(value);
                        }
                        else {
                            taken.add(value);
                        }
                    });
                    values.forEach((value, index) => {
                        if (duplicates.has(value)) {
                            errors[index] = {
                                ...errors[index],
                                [field.key]: {
                                    level: validation.level || "error",
                                    message: validation.errorMessage || "Field must be unique",
                                },
                            };
                        }
                    });
                    break;
                }
                case "required": {
                    data.forEach((entry, index) => {
                        if (entry[field.key] === null || entry[field.key] === undefined || entry[field.key] === "") {
                            errors[index] = {
                                ...errors[index],
                                [field.key]: {
                                    level: validation.level || "error",
                                    message: validation.errorMessage || "Field is required",
                                },
                            };
                        }
                    });
                    break;
                }
                case "regex": {
                    const regex = new RegExp(validation.value, validation.flags);
                    data.forEach((entry, index) => {
                        const value = entry[field.key]?.toString() ?? "";
                        if (!value.match(regex)) {
                            errors[index] = {
                                ...errors[index],
                                [field.key]: {
                                    level: validation.level || "error",
                                    message: validation.errorMessage ||
                                        `Field did not match the regex /${validation.value}/${validation.flags} `,
                                },
                            };
                        }
                    });
                    break;
                }
            }
        });
    });
    return data.map((value, index) => {
        // This is required only for table. Mutates to prevent needless rerenders
        if (!("__index" in value)) {
            value.__index = v4();
        }
        const newValue = value;
        if (errors[index]) {
            return { ...newValue, __errors: errors[index] };
        }
        if (!errors[index] && value?.__errors) {
            return { ...newValue, __errors: null };
        }
        return newValue;
    });
};

export { addErrorsAndRunHooks };
