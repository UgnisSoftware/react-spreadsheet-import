import lavenstein from "js-levenshtein"
import type { Field, Fields } from "@/types"
import type { Column, Columns } from "@/steps/types"
import { findMatch } from "@/steps/MatchColumnsStep/utils/findMatch"
import { setColumn } from "@/steps/MatchColumnsStep/utils/setColumn"
import { MatchColumnsProps } from "@/steps/MatchColumnsStep/MatchColumnsStep"

export const getMatchedColumns = <T extends string>(
  columns: Columns<T>,
  fields: Fields<T>,
  data: MatchColumnsProps<T>["data"],
  autoMapDistance: number,
  autoMapSelectValues?: boolean,
) =>
  columns.reduce<Column<T>[]>((arr, column) => {
    const autoMatch = findMatch(column.header, fields, autoMapDistance)
    if (autoMatch) {
      const field = fields.find((field) => field.key === autoMatch) as Field<T>
      const duplicateIndex = arr.findIndex((column) => "value" in column && column.value === field.key)
      const duplicate = arr[duplicateIndex]
      if (duplicate && "value" in duplicate) {
        return lavenstein(duplicate.value, duplicate.header) < lavenstein(autoMatch, column.header)
          ? [
              ...arr.slice(0, duplicateIndex),
              setColumn(arr[duplicateIndex], field, data, autoMapSelectValues),
              ...arr.slice(duplicateIndex + 1),
              setColumn(column),
            ]
          : [
              ...arr.slice(0, duplicateIndex),
              setColumn(arr[duplicateIndex]),
              ...arr.slice(duplicateIndex + 1),
              setColumn(column, field, data, autoMapSelectValues),
            ]
      } else {
        return [...arr, setColumn(column, field, data, autoMapSelectValues)]
      }
    } else {
      return [...arr, column]
    }
  }, [])
