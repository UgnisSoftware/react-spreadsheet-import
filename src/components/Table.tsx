import DataGrid, { DataGridProps } from "react-data-grid"

interface Props<Data> extends DataGridProps<Data> {
  rowHeight?: number
  hiddenHeader?: boolean
}

export const Table = <Data,>({ className, ...props }: Props<Data>) => {
  return <DataGrid className={"rdg-light " + className || ""} {...props} />
}
