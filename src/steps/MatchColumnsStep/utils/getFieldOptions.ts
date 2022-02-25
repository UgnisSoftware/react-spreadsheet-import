import type { Fields } from "../../../types"

export const getFieldOptions = (fields: Fields<any>, fieldKey: string) => {
  const field = fields.find(({ key }) => fieldKey === key)!
  return field.fieldType.type === "select" ? field.fieldType.options : []
}
