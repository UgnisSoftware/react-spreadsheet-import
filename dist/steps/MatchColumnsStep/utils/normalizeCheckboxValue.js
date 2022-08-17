const booleanWhitelist = {
    yes: true,
    no: false,
    true: true,
    false: false,
};
const normalizeCheckboxValue = (value) => {
    if (value && value.toLowerCase() in booleanWhitelist) {
        return booleanWhitelist[value.toLowerCase()];
    }
    return false;
};

export { normalizeCheckboxValue };
