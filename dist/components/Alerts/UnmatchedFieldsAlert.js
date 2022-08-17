import { jsx, jsxs } from 'react/jsx-runtime';
import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, Box, Text, AlertDialogFooter, Button } from '@chakra-ui/react';
import { useRef } from 'react';
import { useRsi } from '../../hooks/useRsi.js';

const UnmatchedFieldsAlert = ({ isOpen, onClose, onConfirm, fields }) => {
    const { allowInvalidSubmit, translations } = useRsi();
    const cancelRef = useRef(null);
    return (jsx(AlertDialog, { isOpen: isOpen, onClose: onClose, leastDestructiveRef: cancelRef, isCentered: true, id: "rsi", children: jsx(AlertDialogOverlay, { children: jsxs(AlertDialogContent, { children: [jsx(AlertDialogHeader, { fontSize: "lg", fontWeight: "bold", children: translations.alerts.unmatchedRequiredFields.headerTitle }), jsxs(AlertDialogBody, { children: [translations.alerts.unmatchedRequiredFields.bodyText, jsxs(Box, { pt: 3, children: [jsx(Text, { display: "inline", children: translations.alerts.unmatchedRequiredFields.listTitle }), jsxs(Text, { display: "inline", fontWeight: "bold", children: [" ", fields.join(", ")] })] })] }), jsxs(AlertDialogFooter, { children: [jsx(Button, { ref: cancelRef, onClick: onClose, variant: "secondary", children: translations.alerts.unmatchedRequiredFields.cancelButtonTitle }), allowInvalidSubmit && (jsx(Button, { onClick: onConfirm, ml: 3, children: translations.alerts.unmatchedRequiredFields.continueButtonTitle }))] })] }) }) }));
};

export { UnmatchedFieldsAlert };
