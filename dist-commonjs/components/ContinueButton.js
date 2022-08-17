'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react = require('@chakra-ui/react');

const ContinueButton = ({ onContinue, title, isLoading }) => (jsxRuntime.jsx("div", { children: jsxRuntime.jsx(react.Button, { size: "lg", w: "21rem", onClick: onContinue, isLoading: isLoading, className: "continue-button", children: title }) }));

exports.ContinueButton = ContinueButton;
