import { Column, ColumnType } from "@/steps/types"

export const setIgnoreColumn = <T extends string>({ header, index }: Column<T>): Column<T> => ({
  header,
  index,
  type: ColumnType.ignored,
})
