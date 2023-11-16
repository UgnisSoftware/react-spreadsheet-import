import { Column, Columns, HeaderCustomFieldsMap } from "../MatchColumnsStep"
import { CustomFieldsHook, Field, Fields } from "../../../types"

export const createHeaderCustomFieldsMap = (columns: Column<string>[], customFieldsHook?: CustomFieldsHook) => {
  const result: HeaderCustomFieldsMap = {}
  if (!customFieldsHook) return result
  for (const column of columns) {
    result[column.header as string] = customFieldsHook(column)
  }
  return result
}

export const mergeCustomFields = <T extends string>(
  columns: Columns<T>,
  fields: Fields<T>,
  headerCustomFieldsMap: HeaderCustomFieldsMap,
) => {
  const customFields: Field<string>[] = []
  for (const column of columns) {
    if (!("value" in column)) continue
    const columnCustomField = selectColumnCustomFields(column, headerCustomFieldsMap)
    const customField = columnCustomField.find((field) => field.key === column.value)
    if (!customField) continue
    customFields.push(customField)
  }
  return [...fields, ...customFields] as Fields<T>
}

export const selectColumnCustomFields = (column: Column<string>, headerCustomFieldsMap: HeaderCustomFieldsMap) => {
  return headerCustomFieldsMap[column.header as string] ?? []
}
