import type { Field } from "../../../types"
import { Column, ColumnType, MatchColumnsProps } from "../MatchColumnsStep"
import { uniqueEntries } from "./uniqueEntries"

export const setColumn = <T extends string>(oldColumn: Column<T>, field?: Field<T>, data?: MatchColumnsProps["data"]): Column<T> => {
  switch (field?.fieldType.type) {
    case "select":
      return {
        ...oldColumn,
        type: ColumnType.matchedSelect,
        value: field.key,
        matchedOptions: uniqueEntries(data || [], oldColumn.index),
      }
    case "checkbox":
    case "input":
      return { index: oldColumn.index, type: ColumnType.matched, value: field.key, header: oldColumn.header }
    default:
      return { index: oldColumn.index, header: oldColumn.header, type: ColumnType.empty }
  }
}
