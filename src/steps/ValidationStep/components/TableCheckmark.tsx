import { Data } from "@/types"
import { RenderCellProps, useRowSelection } from "react-data-grid"
import type { Meta } from "@/steps/types"
import { Checkmark } from "@chakra-ui/react"

export function TableCheckmark(props: RenderCellProps<Data<string> & Meta, unknown>) {
  const { isRowSelected, onRowSelectionChange } = useRowSelection()
  return (
    <Checkmark
      cursor="pointer"
      role="checkbox"
      aria-label="Select row"
      checked={isRowSelected}
      onClick={(event) =>
        onRowSelectionChange({
          row: props.row,
          checked: !isRowSelected,
          isShiftClick: (event.nativeEvent as MouseEvent).shiftKey,
        })
      }
      size="sm"
    />
  )
}
