import { jsxs, jsx } from 'react/jsx-runtime';
import { useStyleConfig, Box, Flex, Text, IconButton } from '@chakra-ui/react';
import { CgUndo, CgClose } from 'react-icons/cg';
import { ColumnType } from '../MatchColumnsStep.js';
import { dataAttr } from '@chakra-ui/utils';

const UserTableColumn = (props) => {
    const styles = useStyleConfig("MatchColumnsStep");
    const { column: { header, index, type }, entries, onIgnore, onRevertIgnore, } = props;
    const isIgnored = type === ColumnType.ignored;
    return (jsxs(Box, { children: [jsxs(Flex, { px: 6, justifyContent: "space-between", alignItems: "center", mb: 4, children: [jsx(Text, { sx: styles.userTable.header, "data-ignored": dataAttr(isIgnored), children: header }), type === ColumnType.ignored ? (jsx(IconButton, { "aria-label": "Ignore column", icon: jsx(CgUndo, {}), onClick: () => onRevertIgnore(index), ...styles.userTable.ignoreButton })) : (jsx(IconButton, { "aria-label": "Ignore column", icon: jsx(CgClose, {}), onClick: () => onIgnore(index), ...styles.userTable.ignoreButton }))] }), entries.map((entry, index) => (jsx(Text, { sx: styles.userTable.cell, "data-ignored": dataAttr(isIgnored), children: entry }, (entry || "") + index)))] }));
};

export { UserTableColumn };
