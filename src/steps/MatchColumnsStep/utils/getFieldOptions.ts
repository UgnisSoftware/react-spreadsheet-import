import type { Fields } from "../../../types"
import type { DeepReadonly } from "ts-essentials"

export const getFieldOptions = <T extends string>(fields: DeepReadonly<Fields<T>>, fieldKey: string) => {
  const field = fields.find(({ key }) => fieldKey === key)!
  return field.fieldType.type === "select" ? field.fieldType.options : []
}
