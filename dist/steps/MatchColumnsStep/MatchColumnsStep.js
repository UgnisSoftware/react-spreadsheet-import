import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { UserTableColumn } from './components/UserTableColumn.js';
import { useRsi } from '../../hooks/useRsi.js';
import { TemplateColumn } from './components/TemplateColumn.js';
import { ColumnGrid } from './components/ColumnGrid.js';
import { setColumn } from './utils/setColumn.js';
import { setIgnoreColumn } from './utils/setIgnoreColumn.js';
import { setSubColumn } from './utils/setSubColumn.js';
import { normalizeTableData } from './utils/normalizeTableData.js';
import { getMatchedColumns } from './utils/getMatchedColumns.js';
import { UnmatchedFieldsAlert } from '../../components/Alerts/UnmatchedFieldsAlert.js';
import { findUnmatchedRequiredFields } from './utils/findUnmatchedRequiredFields.js';
import { toast } from 'react-toastify';

var ColumnType;
(function (ColumnType) {
    ColumnType[ColumnType["empty"] = 0] = "empty";
    ColumnType[ColumnType["ignored"] = 1] = "ignored";
    ColumnType[ColumnType["matched"] = 2] = "matched";
    ColumnType[ColumnType["matchedCheckbox"] = 3] = "matchedCheckbox";
    ColumnType[ColumnType["matchedSelect"] = 4] = "matchedSelect";
    ColumnType[ColumnType["matchedSelectOptions"] = 5] = "matchedSelectOptions";
})(ColumnType || (ColumnType = {}));
const MatchColumnsStep = ({ data, headerValues, onContinue }) => {
    const dataExample = data.slice(0, 2);
    const { fields, autoMapHeaders, autoMapDistance, translations } = useRsi();
    const [isLoading, setIsLoading] = useState(false);
    const [columns, setColumns] = useState(
    // Do not remove spread, it indexes empty array elements, otherwise map() skips over them
    [...headerValues].map((value, index) => ({ type: ColumnType.empty, index, header: value ?? "" })));
    const [showUnmatchedFieldsAlert, setShowUnmatchedFieldsAlert] = useState(false);
    const onChange = useCallback((value, columnIndex) => {
        const field = fields.find((field) => field.key === value);
        const existingFieldIndex = columns.findIndex((column) => "value" in column && column.value === field.key);
        setColumns(columns.map((column, index) => {
            columnIndex === index ? setColumn(column, field, data) : column;
            if (columnIndex === index) {
                return setColumn(column, field, data);
            }
            else if (index === existingFieldIndex) {
                toast.warn(translations.matchColumnsStep.duplicateColumnWarningDescription);
                return setColumn(column);
            }
            else {
                return column;
            }
        }));
    }, [columns, data, fields, translations.matchColumnsStep.duplicateColumnWarningDescription]);
    const onIgnore = useCallback((columnIndex) => {
        setColumns(columns.map((column, index) => (columnIndex === index ? setIgnoreColumn(column) : column)));
    }, [columns, setColumns]);
    const onRevertIgnore = useCallback((columnIndex) => {
        setColumns(columns.map((column, index) => (columnIndex === index ? setColumn(column) : column)));
    }, [columns, setColumns]);
    const onSubChange = useCallback((value, columnIndex, entry) => {
        setColumns(columns.map((column, index) => columnIndex === index && "matchedOptions" in column ? setSubColumn(column, entry, value) : column));
    }, [columns, setColumns]);
    const unmatchedRequiredFields = useMemo(() => findUnmatchedRequiredFields(fields, columns), [fields, columns]);
    const handleOnContinue = useCallback(async () => {
        if (unmatchedRequiredFields.length > 0) {
            setShowUnmatchedFieldsAlert(true);
        }
        else {
            setIsLoading(true);
            await onContinue(normalizeTableData(columns, data, fields), data, columns);
            setIsLoading(false);
        }
    }, [unmatchedRequiredFields.length, onContinue, columns, data, fields]);
    const handleAlertOnContinue = useCallback(async () => {
        setShowUnmatchedFieldsAlert(false);
        setIsLoading(true);
        await onContinue(normalizeTableData(columns, data, fields), data, columns);
        setIsLoading(false);
    }, [onContinue, columns, data, fields]);
    useEffect(() => {
        if (autoMapHeaders) {
            setColumns(getMatchedColumns(columns, fields, data, autoMapDistance));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (jsxs(Fragment, { children: [jsx(UnmatchedFieldsAlert, { isOpen: showUnmatchedFieldsAlert, onClose: () => setShowUnmatchedFieldsAlert(false), fields: unmatchedRequiredFields, onConfirm: handleAlertOnContinue }), jsx(ColumnGrid, { columns: columns, onContinue: handleOnContinue, isLoading: isLoading, userColumn: (column) => (jsx(UserTableColumn, { column: column, onIgnore: onIgnore, onRevertIgnore: onRevertIgnore, entries: dataExample.map((row) => row[column.index]) })), templateColumn: (column) => jsx(TemplateColumn, { column: column, onChange: onChange, onSubChange: onSubChange }) })] }));
};

export { ColumnType, MatchColumnsStep };
