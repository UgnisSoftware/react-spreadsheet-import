export const generateOptions = (tableData: any): any => {
  if (tableData?.columns) {
    return tableData!.columns!.map((column: any) => ({
      ...column,
      label: column.name || column.uniqueIdentifier,
    }))
  } else {
    return []
  }
}
