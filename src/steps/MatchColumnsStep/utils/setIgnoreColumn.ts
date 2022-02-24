import { Column, ColumnType } from "../MatchColumnsStep"

export const setIgnoreColumn = ({ header, index }: Column): Column => ({ header, index, type: ColumnType.ignored })
