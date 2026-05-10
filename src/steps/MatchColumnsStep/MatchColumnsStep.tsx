import { useCallback, useEffect, useMemo, useState } from "react"
import type { Field, RawData } from "@/types"
import { toaster } from "@/components/ui/toaster"
import { setColumn } from "@/steps/MatchColumnsStep/utils/setColumn"
import { useRSIContext } from "@/contexts/RSIContext"
import { setIgnoreColumn } from "@/steps/MatchColumnsStep/utils/setIgnoreColumn"
import { setSubColumn } from "@/steps/MatchColumnsStep/utils/setSubColumn"
import { findUnmatchedRequiredFields } from "@/steps/MatchColumnsStep/utils/findUnmatchedRequiredFields.ts"
import { normalizeTableData } from "@/steps/MatchColumnsStep/utils/normalizeTableData"
import { getMatchedColumns } from "@/steps/MatchColumnsStep/utils/getMatchedColumns"
import { ColumnGrid } from "@/steps/MatchColumnsStep/components/ColumnGrid"
import { UserTableColumn } from "@/steps/MatchColumnsStep/components/UserTableColumn"
import { UnmatchedFieldsAlert } from "@/components/Alerts/UnmatchedFieldsAlert"
import { TemplateColumn } from "@/steps/MatchColumnsStep/components/TemplateColumn"
import { Column, Columns, ColumnType } from "@/steps/types"

export type MatchColumnsProps<T extends string> = {
  data: RawData[]
  headerValues: RawData
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onContinue: (data: any[], rawData: RawData[], columns: Columns<T>) => void
  onBack?: () => void
}

export const MatchColumnsStep = <T extends string>({
  data,
  headerValues,
  onContinue,
  onBack,
}: MatchColumnsProps<T>) => {
  const dataExample = data.slice(0, 2)
  const { fields, autoMapHeaders, autoMapSelectValues, autoMapDistance, translations } = useRSIContext<T>()
  const [isLoading, setIsLoading] = useState(false)
  const [columns, setColumns] = useState<Columns<T>>(
    // Do not remove spread, it indexes empty array elements, otherwise map() skips over them
    ([...headerValues] as string[]).map((value, index) => ({
      type: ColumnType.empty,
      index,
      header: value ?? "",
    })),
  )
  const [showUnmatchedFieldsAlert, setShowUnmatchedFieldsAlert] = useState(false)

  const onChange = useCallback(
    (value: T, columnIndex: number) => {
      const field = fields.find((field) => field.key === value) as unknown as Field<T>
      const existingFieldIndex = columns.findIndex((column) => "value" in column && column.value === field?.key)
      setColumns(
        columns.map<Column<T>>((column, index) => {
          if (columnIndex === index) {
            return setColumn(column, field, data, autoMapSelectValues)
          } else if (index === existingFieldIndex) {
            toaster.create({
              type: "warning",
              title: translations.matchColumnsStep.duplicateColumnWarningTitle,
              description: translations.matchColumnsStep.duplicateColumnWarningDescription,
              closable: true,
            })
            return setColumn(column)
          } else {
            return column
          }
        }),
      )
    },
    [
      autoMapSelectValues,
      columns,
      data,
      fields,
      translations.matchColumnsStep.duplicateColumnWarningDescription,
      translations.matchColumnsStep.duplicateColumnWarningTitle,
    ],
  )

  const onIgnore = useCallback(
    (columnIndex: number) => {
      setColumns(columns.map((column, index) => (columnIndex === index ? setIgnoreColumn<T>(column) : column)))
    },
    [columns, setColumns],
  )

  const onRevertIgnore = useCallback(
    (columnIndex: number) => {
      setColumns(columns.map((column, index) => (columnIndex === index ? setColumn(column) : column)))
    },
    [columns, setColumns],
  )

  const onSubChange = useCallback(
    (value: string, columnIndex: number, entry: string) => {
      setColumns(
        columns.map((column, index) =>
          columnIndex === index && "matchedOptions" in column ? setSubColumn(column, entry, value) : column,
        ),
      )
    },
    [columns, setColumns],
  )
  const unmatchedRequiredFields = useMemo(() => findUnmatchedRequiredFields(fields, columns), [fields, columns])

  const handleOnContinue = useCallback(async () => {
    if (unmatchedRequiredFields.length > 0) {
      setShowUnmatchedFieldsAlert(true)
    } else {
      setIsLoading(true)
      onContinue(normalizeTableData(columns, data, fields), data, columns)
      setIsLoading(false)
    }
  }, [unmatchedRequiredFields.length, onContinue, columns, data, fields])

  const handleAlertOnContinue = useCallback(async () => {
    setShowUnmatchedFieldsAlert(false)
    setIsLoading(true)
    onContinue(normalizeTableData(columns, data, fields), data, columns)
    setIsLoading(false)
  }, [onContinue, columns, data, fields])

  useEffect(() => {
    if (autoMapHeaders) {
      setColumns(getMatchedColumns(columns, fields, data, autoMapDistance, autoMapSelectValues))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <UnmatchedFieldsAlert
        open={showUnmatchedFieldsAlert}
        onClose={() => setShowUnmatchedFieldsAlert(false)}
        fields={unmatchedRequiredFields}
        onConfirm={handleAlertOnContinue}
      />
      <ColumnGrid
        columns={columns}
        onContinue={handleOnContinue}
        onBack={onBack}
        isLoading={isLoading}
        userColumn={(column) => (
          <UserTableColumn
            column={column}
            onIgnore={onIgnore}
            onRevertIgnore={onRevertIgnore}
            entries={dataExample.map((row) => row[column.index])}
          />
        )}
        templateColumn={(column) => <TemplateColumn column={column} onChange={onChange} onSubChange={onSubChange} />}
      />
    </>
  )
}
