import type { Field } from "../../../types"
import { Column, ColumnType, MatchColumnsProps, MatchedOptions } from "../MatchColumnsStep"
import { uniqueEntries } from "./uniqueEntries"

export const setColumn = <T extends string>(
  oldColumn: Column<T>,
  field?: Field<T>,
  data?: MatchColumnsProps<T>["data"],
  autoMapSelectValues?: boolean,
): Column<T> => {
  switch (field?.fieldType.type) {
    case "select":
      const fieldOptions = field.fieldType.options
      const uniqueData = uniqueEntries(data || [], oldColumn.index) as MatchedOptions<T>[]
      const matchedOptions = autoMapSelectValues
        ? uniqueData.map((record) => {
            const value = fieldOptions.find(
              (fieldOption) => fieldOption.value === record.entry || fieldOption.label === record.entry,
            )?.value
            return value ? ({ ...record, value } as MatchedOptions<T>) : (record as MatchedOptions<T>)
          })
        : uniqueData
      const allMatched = matchedOptions.filter((o) => o.value).length == uniqueData?.length

      return {
        ...oldColumn,
        type: allMatched ? ColumnType.matchedSelectOptions : ColumnType.matchedSelect,
        value: field.key,
        matchedOptions,
      }
    case "checkbox":
      return { index: oldColumn.index, type: ColumnType.matchedCheckbox, value: field.key, header: oldColumn.header }
    case "input":
      return { index: oldColumn.index, type: ColumnType.matched, value: field.key, header: oldColumn.header }
    default:
      return { index: oldColumn.index, header: oldColumn.header, type: ColumnType.empty }
  }
}
