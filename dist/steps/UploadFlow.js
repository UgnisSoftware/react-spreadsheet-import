import { jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { Progress } from '@chakra-ui/react';
import { UploadStep } from './UploadStep/UploadStep.js';
import { SelectHeaderStep } from './SelectHeaderStep/SelectHeaderStep.js';
import { SelectSheetStep } from './SelectSheetStep/SelectSheetStep.js';
import { mapWorkbook } from '../utils/mapWorkbook.js';
import { ValidationStep } from './ValidationStep/ValidationStep.js';
import { MatchColumnsStep } from './MatchColumnsStep/MatchColumnsStep.js';
import { exceedsMaxRecords } from '../utils/exceedsMaxRecords.js';
import { useRsi } from '../hooks/useRsi.js';
import { toast } from 'react-toastify';

var StepType;
(function (StepType) {
    StepType["upload"] = "upload";
    StepType["selectSheet"] = "selectSheet";
    StepType["selectHeader"] = "selectHeader";
    StepType["matchColumns"] = "matchColumns";
    StepType["validateData"] = "validateData";
})(StepType || (StepType = {}));
const UploadFlow = ({ nextStep }) => {
    const { initialStepState } = useRsi();
    const [state, setState] = useState(initialStepState || { type: StepType.upload });
    const { maxRecords, translations, uploadStepHook, selectHeaderStepHook, matchColumnsStepHook } = useRsi();
    switch (state.type) {
        case StepType.upload:
            return (jsx(UploadStep, { onContinue: async (workbook) => {
                    const isSingleSheet = workbook.SheetNames.length === 1;
                    if (isSingleSheet) {
                        if (maxRecords && exceedsMaxRecords(workbook.Sheets[workbook.SheetNames[0]], maxRecords)) {
                            toast.error(translations.uploadStep.maxRecordsExceeded(maxRecords.toString()));
                            return;
                        }
                        try {
                            const mappedWorkbook = await uploadStepHook(mapWorkbook(workbook));
                            setState({
                                type: StepType.selectHeader,
                                data: mappedWorkbook,
                            });
                            nextStep();
                        }
                        catch (e) {
                            toast.error(e.message);
                        }
                    }
                    else {
                        setState({ type: StepType.selectSheet, workbook });
                    }
                } }));
        case StepType.selectSheet:
            return (jsx(SelectSheetStep, { sheetNames: state.workbook.SheetNames, onContinue: async (sheetName) => {
                    if (maxRecords && exceedsMaxRecords(state.workbook.Sheets[sheetName], maxRecords)) {
                        toast.error(translations.uploadStep.maxRecordsExceeded(maxRecords.toString()));
                        return;
                    }
                    try {
                        const mappedWorkbook = await uploadStepHook(mapWorkbook(state.workbook, sheetName));
                        setState({
                            type: StepType.selectHeader,
                            data: mappedWorkbook,
                        });
                        nextStep();
                    }
                    catch (e) {
                        toast.error(e.message);
                    }
                } }));
        case StepType.selectHeader:
            return (jsx(SelectHeaderStep, { data: state.data, onContinue: async (...args) => {
                    try {
                        const { data, headerValues } = await selectHeaderStepHook(...args);
                        setState({
                            type: StepType.matchColumns,
                            data,
                            headerValues,
                        });
                        nextStep();
                    }
                    catch (e) {
                        toast.error(e.message);
                    }
                } }));
        case StepType.matchColumns:
            return (jsx(MatchColumnsStep, { data: state.data, headerValues: state.headerValues, onContinue: async (values, rawData, columns) => {
                    try {
                        const data = await matchColumnsStepHook(values, rawData, columns);
                        setState({
                            type: StepType.validateData,
                            data,
                        });
                        nextStep();
                    }
                    catch (e) {
                        toast.error(e.message);
                    }
                } }));
        case StepType.validateData:
            return jsx(ValidationStep, { initialData: state.data });
        default:
            return jsx(Progress, { isIndeterminate: true });
    }
};

export { StepType, UploadFlow };
