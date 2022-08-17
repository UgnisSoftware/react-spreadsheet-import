import { jsx } from 'react/jsx-runtime';
import DataGrid from 'react-data-grid';

const Table = ({ className, ...props }) => {
    return jsx(DataGrid, { className: "rdg-light " + className || "", ...props });
};

export { Table };
