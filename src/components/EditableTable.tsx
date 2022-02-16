import DataGrid, { DataGridProps } from "react-data-grid"
import { css, Global } from "@emotion/react"
import { useMemo } from "react"

const createGlobalStyleOverride = () => css`
  .rdg.fill-grid {
    block-size: 100%;
  }

  .rdg-cell {
    contain: size layout style paint;
    border-right: 1px solid var(--chakra-colors-gray-100);
    border-bottom: 1px solid var(--chakra-colors-gray-100);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .rdg-static .rdg-cell {
    border-right: none;
    background-color: inherit;
    --rdg-selection-color: none;
  }

  .rdg-header-row .rdg-cell {
    --rdg-selection-color: none;
    border: none;
  }

  .rdg-cell:first-child {
    border-left: 1px solid var(--chakra-colors-gray-100);
  }

  .rdg-row:last-child .rdg-cell:first-child {
    border-radius: 0 0 0 8px;
  }

  .rdg-row:last-child .rdg-cell:last-child {
    border-radius: 0 0 8px 0;
  }

  .rdg-row[aria-selected="true"]:hover {
    background-color: var(--chakra-colors-blue-100);
  }

  .rdg-cell[aria-selected="true"] {
    border-radius: 2px;
    box-shadow: inset 0 0 0 1px var(--rdg-selection-color);
  }

  .rdg-cell-error {
    background-color: var(--chakra-colors-red-50);
    box-shadow: inset 0 0 0 1px var(--chakra-colors-red-100);
  }

  .rdg {
    contain: size layout style paint;
    border-radius: 8px;
    border: none;
    --color: var(--chakra-colors-gray-800);
    --background-color: #fff;
    --header-background-color: var(--chakra-colors-primary-50);
    --rdg-row-hover-background-color: var(--chakra-colors-white);
    --rdg-selection-color: var(--chakra-colors-blue-400);
    --row-selected-background-color: var(--chakra-colors-gray-50);
    --font-size: 14px;
  }
`
const ROW_HEIGHT = 42

interface Props<Data> extends DataGridProps<Data> {
  rowHeight?: number
}

export const EditableTable = <Data extends {}>({ rowHeight = ROW_HEIGHT, className, ...props }: Props<Data>) => {
  const globalStyleOverride = useMemo(() => createGlobalStyleOverride(), [])

  return (
    <>
      <Global styles={globalStyleOverride} />
      <DataGrid className={"rdg-light fill-grid " + className} rowHeight={rowHeight} {...props} />
    </>
  )
}
