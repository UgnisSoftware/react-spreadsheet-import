import lavenstein from 'js-levenshtein';

const findMatch = (header, fields, autoMapDistance) => {
    const smallestValue = fields.reduce((acc, field) => {
        const distance = Math.min(...[
            lavenstein(field.key, header),
            ...(field.alternateMatches?.map((alternate) => lavenstein(alternate, header)) || []),
        ]);
        return distance < acc.distance || acc.distance === undefined
            ? { value: field.key, distance }
            : acc;
    }, {});
    return smallestValue.distance <= autoMapDistance ? smallestValue.value : undefined;
};

export { findMatch };
