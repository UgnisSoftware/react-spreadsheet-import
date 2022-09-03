import { Column, FormatterProps, useRowSelection } from "react-data-grid"
import { Radio } from "@chakra-ui/react"
import type { RawData } from "../../../types"

const SELECT_COLUMN_KEY = "select-row"

function SelectFormatter(props: FormatterProps<unknown>) {
  const [isRowSelected, onRowSelectionChange] = useRowSelection()

  return (
    <Radio
      bg="white"
      aria-label="Select"
      isChecked={isRowSelected}
      onChange={(event) => {
        onRowSelectionChange({
          row: props.row,
          checked: Boolean(event.target.checked),
          isShiftClick: (event.nativeEvent as MouseEvent).shiftKey,
        })
      }}
    />
  )
}

export const SelectColumn: Column<any, any> = {
  key: SELECT_COLUMN_KEY,
  name: "",
  width: 35,
  maxWidth: 35,
  resizable: false,
  sortable: false,
  frozen: true,
  cellClass: "rdg-radio",
  formatter: SelectFormatter,
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
