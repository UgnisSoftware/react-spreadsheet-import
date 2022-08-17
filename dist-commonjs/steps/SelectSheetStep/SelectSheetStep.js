'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react$1 = require('@chakra-ui/react');
var react = require('react');
var ContinueButton = require('../../components/ContinueButton.js');
var useRsi = require('../../hooks/useRsi.js');

const SelectSheetStep = ({ sheetNames, onContinue }) => {
    const [isLoading, setIsLoading] = react.useState(false);
    const { translations } = useRsi.useRsi();
    const [value, setValue] = react.useState(sheetNames[0]);
    const styles = react$1.useStyleConfig("SelectSheetStep");
    const handleOnContinue = react.useCallback(async (data) => {
        setIsLoading(true);
        await onContinue(data);
        setIsLoading(false);
    }, [onContinue]);
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("div", { children: [jsxRuntime.jsx(react$1.Heading, { ...styles.heading, children: translations.uploadStep.selectSheet.title }), jsxRuntime.jsx(react$1.RadioGroup, { onChange: (value) => setValue(value), value: value, children: jsxRuntime.jsx(react$1.Stack, { spacing: 8, children: sheetNames.map((sheetName) => (jsxRuntime.jsx(react$1.Radio, { value: sheetName, ...styles.radio, children: jsxRuntime.jsx(react$1.Text, { ...styles.radioLabel, children: sheetName }) }, sheetName))) }) })] }), jsxRuntime.jsx(ContinueButton.ContinueButton, { isLoading: isLoading, onContinue: () => handleOnContinue(value), title: translations.uploadStep.selectSheet.nextButtonTitle })] }));
};

exports.SelectSheetStep = SelectSheetStep;
