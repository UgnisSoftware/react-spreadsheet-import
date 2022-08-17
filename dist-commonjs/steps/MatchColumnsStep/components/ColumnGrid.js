'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react = require('@chakra-ui/react');
var FadingWrapper = require('../../../components/FadingWrapper.js');
var ContinueButton = require('../../../components/ContinueButton.js');
var useRsi = require('../../../hooks/useRsi.js');

const ColumnGrid = ({ columns, userColumn, templateColumn, onContinue, isLoading, }) => {
    const { translations } = useRsi.useRsi();
    const styles = react.useStyleConfig("MatchColumnsStep");
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("div", { id: "column-grid", children: [jsxRuntime.jsx(react.Heading, { sx: styles.heading, children: translations.matchColumnsStep.title }), jsxRuntime.jsxs(react.Flex, { flex: 1, display: "grid", gridTemplateRows: "auto auto auto 1fr", gridTemplateColumns: `0.75rem repeat(${columns.length}, minmax(18rem, auto)) 0.75rem`, children: [jsxRuntime.jsx(react.Box, { gridColumn: `1/${columns.length + 3}`, children: jsxRuntime.jsx(react.Text, { sx: styles.title, children: translations.matchColumnsStep.userTableTitle }) }), columns.map((column, index) => (jsxRuntime.jsx(react.Box, { gridRow: "2/3", gridColumn: `${index + 2}/${index + 3}`, pt: 3, children: userColumn(column) }, column.header + index))), jsxRuntime.jsx(FadingWrapper.FadingWrapper, { gridColumn: `1/${columns.length + 3}`, gridRow: "2/3" }), jsxRuntime.jsx(react.Box, { gridColumn: `1/${columns.length + 3}`, mt: 7, children: jsxRuntime.jsx(react.Text, { sx: styles.title, children: translations.matchColumnsStep.templateTitle }) }), jsxRuntime.jsx(FadingWrapper.FadingWrapper, { gridColumn: `1/${columns.length + 3}`, gridRow: "4/5" }), columns.map((column, index) => (jsxRuntime.jsx(react.Box, { gridRow: "4/5", gridColumn: `${index + 2}/${index + 3}`, py: "1.125rem", pl: 2, pr: 3, children: templateColumn(column) }, column.header + index)))] })] }), jsxRuntime.jsx(ContinueButton.ContinueButton, { isLoading: isLoading, onContinue: onContinue, title: translations.matchColumnsStep.nextButtonTitle })] }));
};

exports.ColumnGrid = ColumnGrid;
