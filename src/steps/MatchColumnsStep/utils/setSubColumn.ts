import { ColumnType, MatchedOptions, MatchedSelectColumn, MatchedSelectOptionsColumn } from "../MatchColumnsStep"

export const setSubColumn = (
  oldColumn: MatchedSelectColumn | MatchedSelectOptionsColumn,
  entry: string,
  value: string,
): MatchedSelectColumn | MatchedSelectOptionsColumn => {
  const options = oldColumn.matchedOptions.map((option) => (option.entry === entry ? { ...option, value } : option))
  const allMathced = options.every(({ value }) => !!value)
  if (allMathced) {
    return { ...oldColumn, matchedOptions: options as MatchedOptions[], type: ColumnType.matchedSelectOptions }
  } else {
    return { ...oldColumn, matchedOptions: options as MatchedOptions[], type: ColumnType.matchedSelect }
  }
}
