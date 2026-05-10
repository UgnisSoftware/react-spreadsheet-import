import { useRSIContext } from "@/contexts/RSIContext"
import { DataGrid, DataGridProps } from "react-data-grid"

interface Props<Data> extends DataGridProps<Data> {
  rowHeight?: number
  hiddenHeader?: boolean
}

export const Table = <Data,>({ className, ...props }: Props<Data>) => {
  const { rtl } = useRSIContext()

  return (
    <DataGrid
      className={"rdg-light " + className || ""}
      direction={rtl ? "rtl" : "ltr"}
      enableVirtualization={process.env.NODE_ENV !== "test"} // Disable virtualization in tests to ensure all rows are rendered for testing purposes
      {...props}
    />
  )
}
