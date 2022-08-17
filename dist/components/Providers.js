import { jsx } from 'react/jsx-runtime';
import { extendTheme, ChakraProvider } from '@chakra-ui/react';
import { createContext } from 'react';

const RsiContext = createContext({});
const rootId = "chakra-modal-rsi";
const Providers = ({ children, theme, rsiValues }) => {
    const mergedTheme = extendTheme(theme);
    if (!rsiValues.fields) {
        throw new Error("Fields must be provided to react-spreadsheet-import");
    }
    return (jsx(RsiContext.Provider, { value: rsiValues, children: jsx(ChakraProvider, { children: jsx(ChakraProvider, { cssVarsRoot: `#${rootId}`, theme: mergedTheme, children: children }) }) }));
};

export { Providers, RsiContext, rootId };
