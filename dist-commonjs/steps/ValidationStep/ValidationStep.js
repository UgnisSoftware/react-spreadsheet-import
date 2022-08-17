'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react$1 = require('react');
var react = require('@chakra-ui/react');
var ContinueButton = require('../../components/ContinueButton.js');
var useRsi = require('../../hooks/useRsi.js');
var dataMutations = require('./utils/dataMutations.js');
var columns = require('./components/columns.js');
var Table = require('../../components/Table.js');
var SubmitDataAlert = require('../../components/Alerts/SubmitDataAlert.js');

const ValidationStep = ({ initialData }) => {
    const { translations, fields, onClose, onSubmit, rowHook, tableHook } = useRsi.useRsi();
    const styles = react.useStyleConfig("ValidationStep");
    const [data, setData] = react$1.useState(react$1.useMemo(() => dataMutations.addErrorsAndRunHooks(initialData, fields, rowHook, tableHook), 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []));
    const [selectedRows, setSelectedRows] = react$1.useState(new Set());
    const [filterByErrors, setFilterByErrors] = react$1.useState(false);
    const [showSubmitAlert, setShowSubmitAlert] = react$1.useState(false);
    const updateData = react$1.useCallback((rows) => {
        setData(dataMutations.addErrorsAndRunHooks(rows, fields, rowHook, tableHook));
    }, [setData, rowHook, tableHook, fields]);
    const deleteSelectedRows = () => {
        if (selectedRows.size) {
            const newData = data.filter((value) => !selectedRows.has(value.__index));
            updateData(newData);
            setSelectedRows(new Set());
        }
    };
    const updateRow = react$1.useCallback((rows, changedData) => {
        const changes = changedData?.indexes.reduce((acc, index) => {
            // when data is filtered val !== actual index in data
            const realIndex = data.findIndex((value) => value.__index === rows[index].__index);
            acc[realIndex] = rows[index];
            return acc;
        }, {});
        const newData = Object.assign([], data, changes);
        updateData(newData);
    }, [data, updateData]);
    const columns$1 = react$1.useMemo(() => columns.generateColumns(fields), [fields]);
    const tableData = react$1.useMemo(() => {
        if (filterByErrors) {
            return data.filter((value) => {
                if (value?.__errors) {
                    return Object.values(value.__errors)?.filter((err) => err.level === "error").length;
                }
                return false;
            });
        }
        return data;
    }, [data, filterByErrors]);
    const rowKeyGetter = react$1.useCallback((row) => row.__index, []);
    const submitData = () => {
        const all = data.map(({ __index, __errors, ...value }) => ({ ...value }));
        const validData = all.filter((value, index) => {
            const originalValue = data[index];
            if (originalValue?.__errors) {
                return !Object.values(originalValue.__errors)?.filter((err) => err.level === "error").length;
            }
            return true;
        });
        const invalidData = all.filter((value) => !validData.includes(value));
        onSubmit({ validData, invalidData, all: data });
        onClose();
    };
    const onContinue = () => {
        const invalidData = data.find((value) => {
            if (value?.__errors) {
                return !!Object.values(value.__errors)?.filter((err) => err.level === "error").length;
            }
            return false;
        });
        if (!invalidData) {
            submitData();
        }
        else {
            setShowSubmitAlert(true);
        }
    };
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(SubmitDataAlert.SubmitDataAlert, { isOpen: showSubmitAlert, onClose: () => setShowSubmitAlert(false), onConfirm: () => {
                    setShowSubmitAlert(false);
                    submitData();
                } }), jsxRuntime.jsxs("div", { children: [jsxRuntime.jsxs(react.Box, { display: "flex", justifyContent: "space-between", alignItems: "center", mb: "2rem", flexWrap: "wrap", gap: "8px", children: [jsxRuntime.jsx(react.Heading, { sx: styles.heading, children: translations.validationStep.title }), jsxRuntime.jsxs(react.Box, { display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap", children: [jsxRuntime.jsx(react.Button, { variant: "outline", size: "sm", onClick: deleteSelectedRows, className: "discard-button", children: translations.validationStep.discardButtonTitle }), jsxRuntime.jsx(react.Switch, { display: "flex", alignItems: "center", isChecked: filterByErrors, onChange: () => setFilterByErrors(!filterByErrors), children: translations.validationStep.filterSwitchTitle })] })] }), jsxRuntime.jsx(react.Box, { h: 0, flexGrow: 1, className: "validate-step", children: jsxRuntime.jsx(Table.Table, { rowKeyGetter: rowKeyGetter, rows: tableData, onRowsChange: updateRow, columns: columns$1, selectedRows: selectedRows, onSelectedRowsChange: setSelectedRows, components: {
                                noRowsFallback: (jsxRuntime.jsx(react.Box, { display: "flex", justifyContent: "center", gridColumn: "1/-1", mt: "32px", children: filterByErrors
                                        ? translations.validationStep.noRowsMessageWhenFiltered
                                        : translations.validationStep.noRowsMessage })),
                            } }) })] }), jsxRuntime.jsx(ContinueButton.ContinueButton, { onContinue: onContinue, title: translations.validationStep.nextButtonTitle })] }));
};

exports.ValidationStep = ValidationStep;
