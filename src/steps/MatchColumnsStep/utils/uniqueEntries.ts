import uniqBy from "lodash/uniqBy"
import type { MatchColumnsProps, MatchedOptions } from "../MatchColumnsStep"

export const uniqueEntries = (data: MatchColumnsProps["data"], index: number): Partial<MatchedOptions>[] =>
  uniqBy(
    data.map((row) => ({ entry: row[index] })),
    "entry",
  ).filter(({ entry }) => !!entry)
