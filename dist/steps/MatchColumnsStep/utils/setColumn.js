import { ColumnType } from '../MatchColumnsStep.js';
import { uniqueEntries } from './uniqueEntries.js';

const setColumn = (oldColumn, field, data) => {
    switch (field?.fieldType.type) {
        case "select":
            return {
                ...oldColumn,
                type: ColumnType.matchedSelect,
                value: field.key,
                matchedOptions: uniqueEntries(data || [], oldColumn.index),
            };
        case "checkbox":
            return { index: oldColumn.index, type: ColumnType.matchedCheckbox, value: field.key, header: oldColumn.header };
        case "input":
            return { index: oldColumn.index, type: ColumnType.matched, value: field.key, header: oldColumn.header };
        default:
            return { index: oldColumn.index, header: oldColumn.header, type: ColumnType.empty };
    }
};

export { setColumn };
