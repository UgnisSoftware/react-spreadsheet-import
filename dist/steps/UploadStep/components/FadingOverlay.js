import { jsx } from 'react/jsx-runtime';
import { Box } from '@chakra-ui/react';

const FadingOverlay = () => (jsx(Box, { position: "absolute", left: 0, right: 0, bottom: 0, height: "48px", pointerEvents: "none", bgGradient: "linear(to bottom, backgroundAlpha, background)" }));

export { FadingOverlay };
