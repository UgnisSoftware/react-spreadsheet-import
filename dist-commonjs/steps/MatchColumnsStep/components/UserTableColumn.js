'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react = require('@chakra-ui/react');
var cg = require('react-icons/cg');
var MatchColumnsStep = require('../MatchColumnsStep.js');
var utils = require('@chakra-ui/utils');

const UserTableColumn = (props) => {
    const styles = react.useStyleConfig("MatchColumnsStep");
    const { column: { header, index, type }, entries, onIgnore, onRevertIgnore, } = props;
    const isIgnored = type === MatchColumnsStep.ColumnType.ignored;
    return (jsxRuntime.jsxs(react.Box, { children: [jsxRuntime.jsxs(react.Flex, { px: 6, justifyContent: "space-between", alignItems: "center", mb: 4, children: [jsxRuntime.jsx(react.Text, { sx: styles.userTable.header, "data-ignored": utils.dataAttr(isIgnored), children: header }), type === MatchColumnsStep.ColumnType.ignored ? (jsxRuntime.jsx(react.IconButton, { "aria-label": "Ignore column", icon: jsxRuntime.jsx(cg.CgUndo, {}), onClick: () => onRevertIgnore(index), ...styles.userTable.ignoreButton })) : (jsxRuntime.jsx(react.IconButton, { "aria-label": "Ignore column", icon: jsxRuntime.jsx(cg.CgClose, {}), onClick: () => onIgnore(index), ...styles.userTable.ignoreButton }))] }), entries.map((entry, index) => (jsxRuntime.jsx(react.Text, { sx: styles.userTable.cell, "data-ignored": utils.dataAttr(isIgnored), children: entry }, (entry || "") + index)))] }));
};

exports.UserTableColumn = UserTableColumn;
