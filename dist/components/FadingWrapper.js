import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Box } from '@chakra-ui/react';

const FadingWrapper = ({ gridColumn, gridRow }) => (jsxs(Fragment, { children: [jsx(Box, { gridColumn: gridColumn, gridRow: gridRow, borderRadius: "1.2rem", border: "1px solid", borderColor: "border", pointerEvents: "none" }), jsx(Box, { gridColumn: gridColumn, gridRow: gridRow, pointerEvents: "none", bgGradient: "linear(to bottom, backgroundAlpha, background)" })] }));

export { FadingWrapper };
