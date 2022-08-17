import lavenstein from 'js-levenshtein';
import { findMatch } from './findMatch.js';
import { setColumn } from './setColumn.js';

const getMatchedColumns = (columns, fields, data, autoMapDistance) => columns.reduce((arr, column) => {
    const autoMatch = findMatch(column.header, fields, autoMapDistance);
    if (autoMatch) {
        const field = fields.find((field) => field.key === autoMatch);
        const duplicateIndex = arr.findIndex((column) => "value" in column && column.value === field.key);
        const duplicate = arr[duplicateIndex];
        if (duplicate && "value" in duplicate) {
            return lavenstein(duplicate.value, duplicate.header) < lavenstein(autoMatch, column.header)
                ? [
                    ...arr.slice(0, duplicateIndex),
                    setColumn(arr[duplicateIndex], field, data),
                    ...arr.slice(duplicateIndex + 1),
                    setColumn(column),
                ]
                : [
                    ...arr.slice(0, duplicateIndex),
                    setColumn(arr[duplicateIndex]),
                    ...arr.slice(duplicateIndex + 1),
                    setColumn(column, field, data),
                ];
        }
        else {
            return [...arr, setColumn(column, field, data)];
        }
    }
    else {
        return [...arr, column];
    }
}, []);

export { getMatchedColumns };
