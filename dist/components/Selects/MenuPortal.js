import { jsx } from 'react/jsx-runtime';
import { useState, useLayoutEffect, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useTheme, Box } from '@chakra-ui/react';
import { usePopper } from '@chakra-ui/popper';
import { rootId } from '../Providers.js';

function createWrapperAndAppendToBody(wrapperId) {
    const wrapperElement = document.createElement("div");
    wrapperElement.setAttribute("id", wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
}
const SELECT_DROPDOWN_ID = "react-select-dropdown-wrapper";
const MenuPortal = (props) => {
    const theme = useTheme();
    const { popperRef, referenceRef } = usePopper({
        strategy: "fixed",
        matchWidth: true,
    });
    const [wrapperElement, setWrapperElement] = useState(null);
    useLayoutEffect(() => {
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
    useEffect(() => {
        referenceRef(props.controlElement);
    }, [props.controlElement, referenceRef]);
    // wrapperElement state will be null on very first render.
    if (wrapperElement === null)
        return null;
    return ReactDOM.createPortal(jsx(Box, { ref: popperRef, zIndex: theme.zIndices.tooltip, sx: {
            "&[data-popper-reference-hidden]": {
                visibility: "hidden",
                pointerEvents: "none",
            },
        }, id: rootId, children: props.children }), wrapperElement);
};
const customComponents = {
    MenuPortal,
};

export { SELECT_DROPDOWN_ID, customComponents };
