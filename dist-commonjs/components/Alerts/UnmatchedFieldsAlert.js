'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react$1 = require('@chakra-ui/react');
var react = require('react');
var useRsi = require('../../hooks/useRsi.js');

const UnmatchedFieldsAlert = ({ isOpen, onClose, onConfirm, fields }) => {
    const { allowInvalidSubmit, translations } = useRsi.useRsi();
    const cancelRef = react.useRef(null);
    return (jsxRuntime.jsx(react$1.AlertDialog, { isOpen: isOpen, onClose: onClose, leastDestructiveRef: cancelRef, isCentered: true, id: "rsi", children: jsxRuntime.jsx(react$1.AlertDialogOverlay, { children: jsxRuntime.jsxs(react$1.AlertDialogContent, { children: [jsxRuntime.jsx(react$1.AlertDialogHeader, { fontSize: "lg", fontWeight: "bold", children: translations.alerts.unmatchedRequiredFields.headerTitle }), jsxRuntime.jsxs(react$1.AlertDialogBody, { children: [translations.alerts.unmatchedRequiredFields.bodyText, jsxRuntime.jsxs(react$1.Box, { pt: 3, children: [jsxRuntime.jsx(react$1.Text, { display: "inline", children: translations.alerts.unmatchedRequiredFields.listTitle }), jsxRuntime.jsxs(react$1.Text, { display: "inline", fontWeight: "bold", children: [" ", fields.join(", ")] })] })] }), jsxRuntime.jsxs(react$1.AlertDialogFooter, { children: [jsxRuntime.jsx(react$1.Button, { ref: cancelRef, onClick: onClose, variant: "secondary", children: translations.alerts.unmatchedRequiredFields.cancelButtonTitle }), allowInvalidSubmit && (jsxRuntime.jsx(react$1.Button, { onClick: onConfirm, ml: 3, children: translations.alerts.unmatchedRequiredFields.continueButtonTitle }))] })] }) }) }));
};

exports.UnmatchedFieldsAlert = UnmatchedFieldsAlert;
