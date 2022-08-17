'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react = require('@chakra-ui/react');

const FadingOverlay = () => (jsxRuntime.jsx(react.Box, { position: "absolute", left: 0, right: 0, bottom: 0, height: "48px", pointerEvents: "none", bgGradient: "linear(to bottom, backgroundAlpha, background)" }));

exports.FadingOverlay = FadingOverlay;
