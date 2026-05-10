import uniqBy from "lodash.uniqby"

import type { MatchedOptions } from "@/steps/types"
import type { MatchColumnsProps } from "@/steps/MatchColumnsStep/MatchColumnsStep"

export const uniqueEntries = <T extends string>(
  data: MatchColumnsProps<T>["data"],
  index: number,
): Partial<MatchedOptions<T>>[] =>
  uniqBy(
    data.map((row) => ({ entry: row[index] })),
    "entry",
  ).filter(({ entry }) => !!entry)
