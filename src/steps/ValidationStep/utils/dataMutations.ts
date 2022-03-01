import type { Data, Fields, Info, RowHook, TableHook } from "../../../types"
import type { Meta, Errors } from "../types"
import type { DeepReadonly } from "ts-essentials"

export const addErrorsAndRunHooks = <T extends string>(
  data: (Data<T> & Meta)[],
  fields: DeepReadonly<Fields<T>>,
  rowHook?: RowHook<T>,
  tableHook?: TableHook<T>,
): (Data<T> & Meta)[] => {
  let errors: Errors = {}

  const addHookError = (rowIndex: number, fieldKey: T, error: Info) => {
    errors[rowIndex] = {
      ...errors[rowIndex],
      [fieldKey]: error,
    }
  }

  if (tableHook) {
    data = addIndexes(tableHook(data, addHookError))
  }

  if (rowHook) {
    data = addIndexes(data.map((value, index) => rowHook(value, (...props) => addHookError(index, ...props), data)))
  }

  fields.forEach((field) => {
    field.validations?.forEach((validation) => {
      switch (validation.rule) {
        case "unique": {
          const values = data.map((entry) => entry[field.key])
          values.forEach((value, index) => {
            if (values.indexOf(value) !== values.lastIndexOf(value)) {
              errors[index] = {
                ...errors[index],
                [field.key]: {
                  level: validation.level || "error",
                  message: validation.errorMessage || "Field must be unique",
                },
              }
            }
          })
          break
        }
        case "required": {
          data.forEach((entry, index) => {
            if (entry[field.key] === null || entry[field.key] === undefined || entry[field.key] === "") {
              errors[index] = {
                ...errors[index],
                [field.key]: {
                  level: validation.level || "error",
                  message: validation.errorMessage || "Field is required",
                },
              }
            }
          })
          break
        }
        case "regex": {
          const regex = new RegExp(validation.value, validation.flags)
          data.forEach((entry, index) => {
            if (!entry[field.key]?.toString()?.match(regex)) {
              errors[index] = {
                ...errors[index],
                [field.key]: {
                  level: validation.level || "error",
                  message:
                    validation.errorMessage ||
                    `Field did not match the regex /${validation.value}/${validation.flags} `,
                },
              }
            }
          })
          break
        }
      }
    })
  })

  return data.map((value, index) => {
    if (errors[index]) {
      return { ...value, __errors: errors[index] }
    }
    if (!errors[index] && value?.__errors) {
      return { ...value, __errors: null }
    }
    return value
  })
}

export const addIndexes = <T extends string>(arr: Data<T>[]): (Data<T> & { __index: number })[] =>
  arr.map((value, index) => {
    if ("__index" in value) {
      return value as Data<T> & { __index: number }
    }
    return { ...value, __index: index }
  })
