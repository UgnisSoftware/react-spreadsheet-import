'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var Providers = require('../Providers.js');
var chakraReactSelect = require('chakra-react-select');
var react = require('@chakra-ui/react');

const TableSelect = ({ onChange, value, options }) => {
    const styles = react.useStyleConfig("ValidationStep");
    return (jsxRuntime.jsx(chakraReactSelect.Select, { autoFocus: true, size: "sm", value: value, onChange: onChange, placeholder: " ", closeMenuOnScroll: true, menuPosition: "fixed", menuIsOpen: true, menuPortalTarget: document.getElementById(Providers.rootId), options: options, chakraStyles: styles.select }));
};

exports.TableSelect = TableSelect;
