import type { Fields, Info, RowHook, TableHook } from "../../../types"
import type { Data, Meta, Errors } from "../types"

export const addErrorsAndRunHooks = <T extends Data>(
  data: (T & Meta)[],
  fields: Fields<T>,
  rowHook?: RowHook<T>,
  tableHook?: TableHook<T>,
): (T & Meta)[] => {
  let errors: Errors = {}

  const addHookError = <T>(rowIndex: number, fieldKey: keyof T, error: Info) => {
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
            if (entry[field.key] === null || entry[field.key] === undefined || entry[field.key as string] === "") {
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

export const addIndexes = <T>(arr: T[]): (T & { __index: number })[] =>
  arr.map((value, index) => {
    if ("__index" in value) {
      return value as T & { __index: number }
    }
    return { ...value, __index: index }
  })
