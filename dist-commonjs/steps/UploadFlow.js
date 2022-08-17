'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var react$1 = require('@chakra-ui/react');
var UploadStep = require('./UploadStep/UploadStep.js');
var SelectHeaderStep = require('./SelectHeaderStep/SelectHeaderStep.js');
var SelectSheetStep = require('./SelectSheetStep/SelectSheetStep.js');
var mapWorkbook = require('../utils/mapWorkbook.js');
var ValidationStep = require('./ValidationStep/ValidationStep.js');
var MatchColumnsStep = require('./MatchColumnsStep/MatchColumnsStep.js');
var exceedsMaxRecords = require('../utils/exceedsMaxRecords.js');
var useRsi = require('../hooks/useRsi.js');
var reactToastify = require('react-toastify');

exports.StepType = void 0;
(function (StepType) {
    StepType["upload"] = "upload";
    StepType["selectSheet"] = "selectSheet";
    StepType["selectHeader"] = "selectHeader";
    StepType["matchColumns"] = "matchColumns";
    StepType["validateData"] = "validateData";
})(exports.StepType || (exports.StepType = {}));
const UploadFlow = ({ nextStep }) => {
    const { initialStepState } = useRsi.useRsi();
    const [state, setState] = react.useState(initialStepState || { type: exports.StepType.upload });
    const { maxRecords, translations, uploadStepHook, selectHeaderStepHook, matchColumnsStepHook } = useRsi.useRsi();
    switch (state.type) {
        case exports.StepType.upload:
            return (jsxRuntime.jsx(UploadStep.UploadStep, { onContinue: async (workbook) => {
                    const isSingleSheet = workbook.SheetNames.length === 1;
                    if (isSingleSheet) {
                        if (maxRecords && exceedsMaxRecords.exceedsMaxRecords(workbook.Sheets[workbook.SheetNames[0]], maxRecords)) {
                            reactToastify.toast.error(translations.uploadStep.maxRecordsExceeded(maxRecords.toString()));
                            return;
                        }
                        try {
                            const mappedWorkbook = await uploadStepHook(mapWorkbook.mapWorkbook(workbook));
                            setState({
                                type: exports.StepType.selectHeader,
                                data: mappedWorkbook,
                            });
                            nextStep();
                        }
                        catch (e) {
                            reactToastify.toast.error(e.message);
                        }
                    }
                    else {
                        setState({ type: exports.StepType.selectSheet, workbook });
                    }
                } }));
        case exports.StepType.selectSheet:
            return (jsxRuntime.jsx(SelectSheetStep.SelectSheetStep, { sheetNames: state.workbook.SheetNames, onContinue: async (sheetName) => {
                    if (maxRecords && exceedsMaxRecords.exceedsMaxRecords(state.workbook.Sheets[sheetName], maxRecords)) {
                        reactToastify.toast.error(translations.uploadStep.maxRecordsExceeded(maxRecords.toString()));
                        return;
                    }
                    try {
                        const mappedWorkbook = await uploadStepHook(mapWorkbook.mapWorkbook(state.workbook, sheetName));
                        setState({
                            type: exports.StepType.selectHeader,
                            data: mappedWorkbook,
                        });
                        nextStep();
                    }
                    catch (e) {
                        reactToastify.toast.error(e.message);
                    }
                } }));
        case exports.StepType.selectHeader:
            return (jsxRuntime.jsx(SelectHeaderStep.SelectHeaderStep, { data: state.data, onContinue: async (...args) => {
                    try {
                        const { data, headerValues } = await selectHeaderStepHook(...args);
                        setState({
                            type: exports.StepType.matchColumns,
                            data,
                            headerValues,
                        });
                        nextStep();
                    }
                    catch (e) {
                        reactToastify.toast.error(e.message);
                    }
                } }));
        case exports.StepType.matchColumns:
            return (jsxRuntime.jsx(MatchColumnsStep.MatchColumnsStep, { data: state.data, headerValues: state.headerValues, onContinue: async (values, rawData, columns) => {
                    try {
                        const data = await matchColumnsStepHook(values, rawData, columns);
                        setState({
                            type: exports.StepType.validateData,
                            data,
                        });
                        nextStep();
                    }
                    catch (e) {
                        reactToastify.toast.error(e.message);
                    }
                } }));
        case exports.StepType.validateData:
            return jsxRuntime.jsx(ValidationStep.ValidationStep, { initialData: state.data });
        default:
            return jsxRuntime.jsx(react$1.Progress, { isIndeterminate: true });
    }
};

exports.UploadFlow = UploadFlow;
