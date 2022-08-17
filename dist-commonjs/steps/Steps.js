'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var UploadFlow = require('./UploadFlow.js');
require('@chakra-ui/react');
var chakraUiSteps = require('chakra-ui-steps');
require('react-icons/cg');
var useRsi = require('../hooks/useRsi.js');

const Steps = () => {
    useRsi.useRsi();
    const { nextStep, activeStep } = chakraUiSteps.useSteps({
        initialStep: 0,
    });
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(UploadFlow.UploadFlow, { nextStep: nextStep }) }));
};

exports.Steps = Steps;
