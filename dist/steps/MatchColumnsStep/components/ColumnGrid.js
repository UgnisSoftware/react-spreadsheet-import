import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useStyleConfig, Heading, Flex, Box, Text } from '@chakra-ui/react';
import { FadingWrapper } from '../../../components/FadingWrapper.js';
import { ContinueButton } from '../../../components/ContinueButton.js';
import { useRsi } from '../../../hooks/useRsi.js';

const ColumnGrid = ({ columns, userColumn, templateColumn, onContinue, isLoading, }) => {
    const { translations } = useRsi();
    const styles = useStyleConfig("MatchColumnsStep");
    return (jsxs(Fragment, { children: [jsxs("div", { id: "column-grid", children: [jsx(Heading, { sx: styles.heading, children: translations.matchColumnsStep.title }), jsxs(Flex, { flex: 1, display: "grid", gridTemplateRows: "auto auto auto 1fr", gridTemplateColumns: `0.75rem repeat(${columns.length}, minmax(18rem, auto)) 0.75rem`, children: [jsx(Box, { gridColumn: `1/${columns.length + 3}`, children: jsx(Text, { sx: styles.title, children: translations.matchColumnsStep.userTableTitle }) }), columns.map((column, index) => (jsx(Box, { gridRow: "2/3", gridColumn: `${index + 2}/${index + 3}`, pt: 3, children: userColumn(column) }, column.header + index))), jsx(FadingWrapper, { gridColumn: `1/${columns.length + 3}`, gridRow: "2/3" }), jsx(Box, { gridColumn: `1/${columns.length + 3}`, mt: 7, children: jsx(Text, { sx: styles.title, children: translations.matchColumnsStep.templateTitle }) }), jsx(FadingWrapper, { gridColumn: `1/${columns.length + 3}`, gridRow: "4/5" }), columns.map((column, index) => (jsx(Box, { gridRow: "4/5", gridColumn: `${index + 2}/${index + 3}`, py: "1.125rem", pl: 2, pr: 3, children: templateColumn(column) }, column.header + index)))] })] }), jsx(ContinueButton, { isLoading: isLoading, onContinue: onContinue, title: translations.matchColumnsStep.nextButtonTitle })] }));
};

export { ColumnGrid };
