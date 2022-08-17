'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var chakraReactSelect = require('chakra-react-select');
var MenuPortal = require('./MenuPortal.js');
var react = require('@chakra-ui/react');

const MatchColumnSelect = ({ onChange, value, options, placeholder, name }) => {
    const styles = react.useStyleConfig("MatchColumnsStep");
    return (jsxRuntime.jsx(chakraReactSelect.Select, { value: value || null, colorScheme: "gray", onChange: onChange, placeholder: placeholder, options: options, chakraStyles: styles.select, menuPosition: "fixed", components: MenuPortal.customComponents, "aria-label": name }));
};

exports.MatchColumnSelect = MatchColumnSelect;
