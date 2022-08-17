'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react$1 = require('@chakra-ui/react');
var react = require('react');

const RsiContext = react.createContext({});
const rootId = "chakra-modal-rsi";
const Providers = ({ children, theme, rsiValues }) => {
    const mergedTheme = react$1.extendTheme(theme);
    if (!rsiValues.fields) {
        throw new Error("Fields must be provided to react-spreadsheet-import");
    }
    return (jsxRuntime.jsx(RsiContext.Provider, { value: rsiValues, children: jsxRuntime.jsx(react$1.ChakraProvider, { children: jsxRuntime.jsx(react$1.ChakraProvider, { cssVarsRoot: `#${rootId}`, theme: mergedTheme, children: children }) }) }));
};

exports.Providers = Providers;
exports.RsiContext = RsiContext;
exports.rootId = rootId;
