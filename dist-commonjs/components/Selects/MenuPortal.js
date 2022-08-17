'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react$1 = require('react');
var ReactDOM = require('react-dom');
var react = require('@chakra-ui/react');
var popper = require('@chakra-ui/popper');
var Providers = require('../Providers.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

function createWrapperAndAppendToBody(wrapperId) {
    const wrapperElement = document.createElement("div");
    wrapperElement.setAttribute("id", wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
}
const SELECT_DROPDOWN_ID = "react-select-dropdown-wrapper";
const MenuPortal = (props) => {
    const theme = react.useTheme();
    const { popperRef, referenceRef } = popper.usePopper({
        strategy: "fixed",
        matchWidth: true,
    });
    const [wrapperElement, setWrapperElement] = react$1.useState(null);
    react$1.useLayoutEffect(() => {
        let element = document.getElementById(SELECT_DROPDOWN_ID);
        let systemCreated = false;
        if (!element) {
            systemCreated = true;
            element = createWrapperAndAppendToBody(SELECT_DROPDOWN_ID);
        }
        setWrapperElement(element);
        return () => {
            if (systemCreated && element?.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
    }, []);
    react$1.useEffect(() => {
        referenceRef(props.controlElement);
    }, [props.controlElement, referenceRef]);
    // wrapperElement state will be null on very first render.
    if (wrapperElement === null)
        return null;
    return ReactDOM__default["default"].createPortal(jsxRuntime.jsx(react.Box, { ref: popperRef, zIndex: theme.zIndices.tooltip, sx: {
            "&[data-popper-reference-hidden]": {
                visibility: "hidden",
                pointerEvents: "none",
            },
        }, id: Providers.rootId, children: props.children }), wrapperElement);
};
const customComponents = {
    MenuPortal,
};

exports.SELECT_DROPDOWN_ID = SELECT_DROPDOWN_ID;
exports.customComponents = customComponents;
