import levenshtein from 'js-levenshtein';

// Initial values generator for MatchColumns component
export const generateInitialValues = (arr: string[], options: any[]) =>
  arr.reduce((acc, item) => {
    const closestOption: any = options.reduce((res, option) => {
      return levenshtein(item, option.label) < levenshtein(item, res.label)
        ? option
        : res;
    });
    return { ...acc, [item]: closestOption.uniqueIdentifier };
  }, {});
