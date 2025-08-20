import { useRowSelection } from "react-data-grid"
import type { RawData } from "@/types"
import { Radiomark } from "@chakra-ui/react"

const SELECT_COLUMN_KEY = "select-row"

function SelectFormatter() {
  const { isRowSelected } = useRowSelection()

  return <Radiomark size="sm" cursor="pointer" aria-label="Select" role="radio" checked={isRowSelected} />
}

export const SelectColumn = {
  key: SELECT_COLUMN_KEY,
  name: "",
  width: 35,
  minWidth: 35,
  maxWidth: 35,
  resizable: false,
  sortable: false,
  frozen: true,
  cellClass: "rdg-radio",
  renderCell: SelectFormatter,
}

export const generateSelectionColumns = (data: RawData[]) => {
  const longestRowLength = data.reduce((acc, curr) => (acc > curr.length ? acc : curr.length), 0)
  return [
    SelectColumn,
    ...Array.from(Array(longestRowLength), (_, index) => ({
      key: index.toString(),
      name: "",
    })),
  ]
}
