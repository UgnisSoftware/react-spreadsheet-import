import { jsx } from 'react/jsx-runtime';
import { useMemo } from 'react';
import { Table } from '../../../components/Table.js';
import { generateColumns } from './columns.js';
import { generateExampleRow } from '../utils/generateExampleRow.js';

const ExampleTable = ({ fields }) => {
    const data = useMemo(() => generateExampleRow(fields), [fields]);
    const columns = useMemo(() => generateColumns(fields), [fields]);
    return jsx(Table, { rows: data, columns: columns, className: "rdg-example" });
};

export { ExampleTable };
