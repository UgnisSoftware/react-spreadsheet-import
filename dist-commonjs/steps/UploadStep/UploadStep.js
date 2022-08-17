'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react$1 = require('@chakra-ui/react');
var DropZone = require('./components/DropZone.js');
var useRsi = require('../../hooks/useRsi.js');
var ExampleTable = require('./components/ExampleTable.js');
var react = require('react');
var FadingOverlay = require('./components/FadingOverlay.js');

const UploadStep = ({ onContinue }) => {
    const [isLoading, setIsLoading] = react.useState(false);
    const styles = react$1.useStyleConfig("UploadStep");
    const { translations, fields } = useRsi.useRsi();
    const handleOnContinue = react.useCallback(async (data) => {
        setIsLoading(true);
        await onContinue(data);
        setIsLoading(false);
    }, [onContinue]);
    return (jsxRuntime.jsxs("div", { id: "uploader", children: [jsxRuntime.jsx(react$1.Heading, { sx: styles.heading, children: translations.uploadStep.title }), jsxRuntime.jsx(react$1.Text, { sx: styles.title, children: translations.uploadStep.manifestTitle }), jsxRuntime.jsx(react$1.Text, { sx: styles.subtitle, children: translations.uploadStep.manifestDescription }), jsxRuntime.jsxs(react$1.Box, { sx: styles.tableWrapper, className: "example-wrapper", children: [jsxRuntime.jsx(ExampleTable.ExampleTable, { fields: fields }), jsxRuntime.jsx(FadingOverlay.FadingOverlay, {})] }), jsxRuntime.jsx(DropZone.DropZone, { onContinue: handleOnContinue, isLoading: isLoading })] }));
};

exports.UploadStep = UploadStep;
