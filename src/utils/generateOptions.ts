export type Option = {
  label: string;
}

export const generateOptions = (tableData: object[]): Option[] => {
  if (tableData?.columns) {
    return tableData!.columns!.map((column) => ({
      ...column,
      label: column.name || column.uniqueIdentifier,
    }));
  } else {
    return [];
  }
};
