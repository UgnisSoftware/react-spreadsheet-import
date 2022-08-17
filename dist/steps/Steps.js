import { jsx, Fragment } from 'react/jsx-runtime';
import { UploadFlow } from './UploadFlow.js';
import '@chakra-ui/react';
import { useSteps } from 'chakra-ui-steps';
import 'react-icons/cg';
import { useRsi } from '../hooks/useRsi.js';

const Steps = () => {
    useRsi();
    const { nextStep, activeStep } = useSteps({
        initialStep: 0,
    });
    return (jsx(Fragment, { children: jsx(UploadFlow, { nextStep: nextStep }) }));
};

export { Steps };
