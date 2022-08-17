import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useStyleConfig, Heading, RadioGroup, Stack, Radio, Text } from '@chakra-ui/react';
import { useState, useCallback } from 'react';
import { ContinueButton } from '../../components/ContinueButton.js';
import { useRsi } from '../../hooks/useRsi.js';

const SelectSheetStep = ({ sheetNames, onContinue }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { translations } = useRsi();
    const [value, setValue] = useState(sheetNames[0]);
    const styles = useStyleConfig("SelectSheetStep");
    const handleOnContinue = useCallback(async (data) => {
        setIsLoading(true);
        await onContinue(data);
        setIsLoading(false);
    }, [onContinue]);
    return (jsxs(Fragment, { children: [jsxs("div", { children: [jsx(Heading, { ...styles.heading, children: translations.uploadStep.selectSheet.title }), jsx(RadioGroup, { onChange: (value) => setValue(value), value: value, children: jsx(Stack, { spacing: 8, children: sheetNames.map((sheetName) => (jsx(Radio, { value: sheetName, ...styles.radio, children: jsx(Text, { ...styles.radioLabel, children: sheetName }) }, sheetName))) }) })] }), jsx(ContinueButton, { isLoading: isLoading, onContinue: () => handleOnContinue(value), title: translations.uploadStep.selectSheet.nextButtonTitle })] }));
};

export { SelectSheetStep };
