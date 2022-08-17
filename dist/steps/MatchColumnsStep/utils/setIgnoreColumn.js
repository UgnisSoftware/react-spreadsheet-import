import { ColumnType } from '../MatchColumnsStep.js';

const setIgnoreColumn = ({ header, index }) => ({
    header,
    index,
    type: ColumnType.ignored,
});

export { setIgnoreColumn };
