import { ColumnType } from '../MatchColumnsStep.js';

const setSubColumn = (oldColumn, entry, value) => {
    const options = oldColumn.matchedOptions.map((option) => (option.entry === entry ? { ...option, value } : option));
    const allMathced = options.every(({ value }) => !!value);
    if (allMathced) {
        return { ...oldColumn, matchedOptions: options, type: ColumnType.matchedSelectOptions };
    }
    else {
        return { ...oldColumn, matchedOptions: options, type: ColumnType.matchedSelect };
    }
};

export { setSubColumn };
