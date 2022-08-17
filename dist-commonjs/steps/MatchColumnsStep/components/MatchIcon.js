'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react = require('@chakra-ui/react');
var utils = require('@chakra-ui/utils');
var framerMotion = require('framer-motion');
var cg = require('react-icons/cg');

const MotionFlex = framerMotion.motion(react.Flex);
const animationConfig = {
    transition: {
        duration: 0.1,
    },
    exit: { scale: 0.5, opacity: 0 },
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
};
const MatchIcon = (props) => {
    const style = react.useStyleConfig("MatchIcon", props);
    return (jsxRuntime.jsx(react.chakra.div, { __css: style, minW: 6, minH: 6, w: 6, h: 6, ml: "0.875rem", mr: 3, "data-highlighted": utils.dataAttr(props.isChecked), "data-testid": "column-checkmark", children: props.isChecked && (jsxRuntime.jsx(MotionFlex, { ...animationConfig, children: jsxRuntime.jsx(cg.CgCheck, { size: "1.5rem" }) })) }));
};

exports.MatchIcon = MatchIcon;
