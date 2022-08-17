import { jsx } from 'react/jsx-runtime';
import { Button } from '@chakra-ui/react';

const ContinueButton = ({ onContinue, title, isLoading }) => (jsx("div", { children: jsx(Button, { size: "lg", w: "21rem", onClick: onContinue, isLoading: isLoading, className: "continue-button", children: title }) }));

export { ContinueButton };
