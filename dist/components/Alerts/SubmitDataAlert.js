import { jsx, jsxs } from 'react/jsx-runtime';
import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button } from '@chakra-ui/react';
import { useRef } from 'react';
import { useRsi } from '../../hooks/useRsi.js';

const SubmitDataAlert = ({ isOpen, onClose, onConfirm }) => {
    const { allowInvalidSubmit, translations } = useRsi();
    const cancelRef = useRef(null);
    return (jsx(AlertDialog, { isOpen: isOpen, onClose: onClose, leastDestructiveRef: cancelRef, isCentered: true, id: "rsi", children: jsx(AlertDialogOverlay, { children: jsxs(AlertDialogContent, { children: [jsx(AlertDialogHeader, { fontSize: "lg", fontWeight: "bold", children: translations.alerts.submitIncomplete.headerTitle }), jsx(AlertDialogBody, { children: allowInvalidSubmit
                            ? translations.alerts.submitIncomplete.bodyText
                            : translations.alerts.submitIncomplete.bodyTextSubmitForbidden }), jsxs(AlertDialogFooter, { children: [jsx(Button, { ref: cancelRef, onClick: onClose, variant: "secondary", children: translations.alerts.submitIncomplete.cancelButtonTitle }), allowInvalidSubmit && (jsx(Button, { onClick: onConfirm, ml: 3, children: translations.alerts.submitIncomplete.finishButtonTitle }))] })] }) }) }));
};

export { SubmitDataAlert };
