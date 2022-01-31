import levenshtein from 'js-levenshtein';
import type { Option } from './generateOptions';

// Initial values generator for MatchColumns component
export const generateInitialValues = (arr: string[], options: Option[]) =>
  arr.reduce((acc, item) => {
    const closestOption = options.reduce((res, option) => {
      return levenshtein(item, option.label) < levenshtein(item, res.label)
        ? option
        : res;
    });
    return { ...acc, [item]: closestOption.uniqueIdentifier };
  }, {});
