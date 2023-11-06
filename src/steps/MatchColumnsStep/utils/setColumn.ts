import type { Field } from "../../../types"
import { Column, ColumnType, MatchColumnsProps } from "../MatchColumnsStep"
import { uniqueEntries } from "./uniqueEntries"

export const setColumn = <T extends string>(
  oldColumn: Column<T>,
  field?: Field<T>,
  data?: MatchColumnsProps<T>["data"],
): Column<T> => {
  switch (field?.fieldType.type) {
    case "select":
      const uniqueData = uniqueEntries(data || [], oldColumn.index)
      const matchedOptions = uniqueData?.map(option => {
        const value = field.fieldType.options.find(o => o.value == option.value || o.label == option.entry)?.value
        return value ? {...option, value} as MatchedOptions<T>  : option as MatchedOptions<T>
      })
      const allMatched = matchedOptions.filter(o => o.value).length == uniqueData?.length

      return {
        ...oldColumn,
        type: allMatched ? ColumnType.matchedSelectOptions : ColumnType.matchedSelect,
        value: field.key,
        matchedOptions
      }
    case "checkbox":
      return { index: oldColumn.index, type: ColumnType.matchedCheckbox, value: field.key, header: oldColumn.header }
    case "input":
      return { index: oldColumn.index, type: ColumnType.matched, value: field.key, header: oldColumn.header }
    default:
      return { index: oldColumn.index, header: oldColumn.header, type: ColumnType.empty }
  }
}
