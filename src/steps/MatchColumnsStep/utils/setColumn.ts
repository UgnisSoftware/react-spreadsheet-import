import type { Field } from "../../../types"
import { Column, ColumnType, MatchColumnsProps } from "../MatchColumnsStep"
import { uniqueEntries } from "./uniqueEntries"

export const setColumn = (oldColumn: Column, field?: Field<any>, data?: MatchColumnsProps["data"]): Column => {
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
