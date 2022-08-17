'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react = require('@chakra-ui/react');

const FadingWrapper = ({ gridColumn, gridRow }) => (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(react.Box, { gridColumn: gridColumn, gridRow: gridRow, borderRadius: "1.2rem", border: "1px solid", borderColor: "border", pointerEvents: "none" }), jsxRuntime.jsx(react.Box, { gridColumn: gridColumn, gridRow: gridRow, pointerEvents: "none", bgGradient: "linear(to bottom, backgroundAlpha, background)" })] }));

exports.FadingWrapper = FadingWrapper;
