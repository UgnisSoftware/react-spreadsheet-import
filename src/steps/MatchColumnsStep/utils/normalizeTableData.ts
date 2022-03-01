import type { Columns } from "../MatchColumnsStep"
import { ColumnType } from "../MatchColumnsStep"
import type { Data } from "../../../types"

export const normalizeTableData = <T extends string>(columns: Columns<T>, data: (string | number)[][]) =>
  data.map((row) =>
    row.reduce((acc, curr, index) => {
      const column = columns[index]
      switch (column.type) {
        case ColumnType.matched: {
          acc[column.value] = curr === "" ? undefined : curr
          return acc
        }
        case ColumnType.matchedSelect:
        case ColumnType.matchedSelectOptions: {
          const matchedOption = column.matchedOptions.find(({ entry, value }) => entry === curr)
          acc[column.value] = matchedOption?.value || undefined
          return acc
        }
        case ColumnType.empty:
        case ColumnType.ignored: {
          return acc
        }
        default:
          return acc
      }
    }, {} as Data<T>),
  )
