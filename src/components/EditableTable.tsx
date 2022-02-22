import DataGrid, { DataGridProps } from "react-data-grid"
import { css, Global } from "@emotion/react"
import { useMemo } from "react"

const createGlobalStyleOverride = () => css`
  .rdg.fill-grid {
    block-size: 100%;
  }

  .rdg-header-row .rdg-cell {
    font-size: var(--chakra-fontSizes-xs);
    line-height: var(--chakra-lineHeights-10);
    font-weight: var(--chakra-fontWeights-bold);
    letter-spacing: var(--chakra-letterSpacings-wider);
    color: var(--chakra-colors-gray-700);
    text-transform: uppercase;
  }

  .rdg-static .rdg-header-row {
    display: none;
  }

  .rdg-cell {
    contain: size layout style paint;
    border-right: none;
    border-bottom: 1px solid var(--chakra-colors-gray-100);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .rdg-static .rdg-cell {
    --rdg-selection-color: none;
  }

  .rdg-radio {
    display: flex;
    align-items: center;
  }

  .rdg-checkbox {
    --rdg-selection-color: none;
    display: flex;
    align-items: center;
  }

  .rdg-cell:first-child {
    border-left: 1px solid var(--chakra-colors-gray-100);
  }
  .rdg-cell:last-child {
    border-right: 1px solid var(--chakra-colors-gray-100);
  }

  .rdg-header-row .rdg-cell:first-child {
    border-radius: 8px 0 0 0;
  }

  .rdg-header-row .rdg-cell:last-child {
    border-radius: 0 8px 0 0;
  }

  .rdg-row:last-child .rdg-cell:first-child {
    border-radius: 0 0 0 8px;
  }

  .rdg-row:last-child .rdg-cell:last-child {
    border-radius: 0 0 8px 0;
  }

  .rdg-row[aria-selected="true"]:hover {
    background-color: var(--rdg-row-selected-background-color);
  }

  .rdg-cell[aria-selected="true"] {
    box-shadow: inset 0 0 0 1px var(--rdg-selection-color);
  }

  .rdg-cell-error {
    background-color: var(--chakra-colors-red-50);
    box-shadow: inset 0 0 0 1px var(--chakra-colors-red-100);
  }
  .rdg-cell-warning {
    background-color: var(--chakra-colors-orange-50);
    box-shadow: 0 1px 0 0 var(--chakra-colors-orange-100);
  }
  .rdg-cell-info {
    background-color: var(--chakra-colors-blue-50);
    box-shadow: inset 0 0 0 1px var(--chakra-colors-blue-100);
  }

  .rdg {
    contain: size layout style paint;
    border-radius: 8px;
    border: none;
    border-top: 1px solid var(--chakra-colors-gray-100);
    --rdg-color: var(--chakra-colors-gray-800);
    --background-color: #fff;
    --rdg-header-background-color: var(--chakra-colors-white);
    --rdg-row-hover-background-color: var(--chakra-colors-white);
    --rdg-selection-color: var(--chakra-colors-blue-400);
    --rdg-row-selected-background-color: var(--chakra-colors-rsi-50);
    --rdg-frozen-cell-box-shadow: none;
    --rdg-font-size: 14px;
  }
`
const ROW_HEIGHT = 35

interface Props<Data> extends DataGridProps<Data> {
  rowHeight?: number
  hiddenHeader?: boolean
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
