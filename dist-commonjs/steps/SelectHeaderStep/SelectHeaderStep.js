'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react$1 = require('react');
var react = require('@chakra-ui/react');
var SelectHeaderTable = require('./components/SelectHeaderTable.js');
var ContinueButton = require('../../components/ContinueButton.js');
var useRsi = require('../../hooks/useRsi.js');

const SelectHeaderStep = ({ data, onContinue }) => {
    const styles = react.useStyleConfig("SelectHeaderStep");
    const { translations } = useRsi.useRsi();
    const [selectedRows, setSelectedRows] = react$1.useState(new Set([0]));
    const [isLoading, setIsLoading] = react$1.useState(false);
    const handleContinue = react$1.useCallback(async () => {
        const [selectedRowIndex] = selectedRows;
        // We consider data above header to be redundant
        const trimmedData = data.slice(selectedRowIndex + 1);
        setIsLoading(true);
        await onContinue(data[selectedRowIndex], trimmedData);
        setIsLoading(false);
    }, [onContinue, data, selectedRows]);
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("div", { children: [jsxRuntime.jsx(react.Heading, { ...styles.heading, children: translations.selectHeaderStep.title }), jsxRuntime.jsx(react.Box, { h: 0, flexGrow: 1, className: "select-header", children: jsxRuntime.jsx(SelectHeaderTable.SelectHeaderTable, { data: data, selectedRows: selectedRows, setSelectedRows: setSelectedRows }) })] }), jsxRuntime.jsx(ContinueButton.ContinueButton, { onContinue: handleContinue, title: translations.selectHeaderStep.nextButtonTitle, isLoading: isLoading })] }));
};

exports.SelectHeaderStep = SelectHeaderStep;
