import { jsxs, jsx } from 'react/jsx-runtime';
import { Box, Tooltip } from '@chakra-ui/react';
import { CgInfo } from 'react-icons/cg';

const generateColumns = (fields) => fields.map((column) => ({
    key: column.key,
    name: column.label,
    minWidth: 150,
    headerRenderer: () => (jsxs(Box, { display: "flex", gap: 1, alignItems: "center", position: "relative", children: [jsx(Box, { flex: 1, overflow: "hidden", textOverflow: "ellipsis", children: column.label }), column.description && (jsx(Tooltip, { placement: "top", hasArrow: true, label: column.description, children: jsx(Box, { flex: "0 0 auto", children: jsx(CgInfo, { size: "1rem" }) }) }))] })),
    formatter: ({ row }) => (jsx(Box, { minWidth: "100%", minHeight: "100%", overflow: "hidden", textOverflow: "ellipsis", children: row[column.key] })),
}));

export { generateColumns };
