'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react$1 = require('@chakra-ui/react');
var react = require('react');
var useRsi = require('../../hooks/useRsi.js');

const SubmitDataAlert = ({ isOpen, onClose, onConfirm }) => {
    const { allowInvalidSubmit, translations } = useRsi.useRsi();
    const cancelRef = react.useRef(null);
    return (jsxRuntime.jsx(react$1.AlertDialog, { isOpen: isOpen, onClose: onClose, leastDestructiveRef: cancelRef, isCentered: true, id: "rsi", children: jsxRuntime.jsx(react$1.AlertDialogOverlay, { children: jsxRuntime.jsxs(react$1.AlertDialogContent, { children: [jsxRuntime.jsx(react$1.AlertDialogHeader, { fontSize: "lg", fontWeight: "bold", children: translations.alerts.submitIncomplete.headerTitle }), jsxRuntime.jsx(react$1.AlertDialogBody, { children: allowInvalidSubmit
                            ? translations.alerts.submitIncomplete.bodyText
                            : translations.alerts.submitIncomplete.bodyTextSubmitForbidden }), jsxRuntime.jsxs(react$1.AlertDialogFooter, { children: [jsxRuntime.jsx(react$1.Button, { ref: cancelRef, onClick: onClose, variant: "secondary", children: translations.alerts.submitIncomplete.cancelButtonTitle }), allowInvalidSubmit && (jsxRuntime.jsx(react$1.Button, { onClick: onConfirm, ml: 3, children: translations.alerts.submitIncomplete.finishButtonTitle }))] })] }) }) }));
};

exports.SubmitDataAlert = SubmitDataAlert;
