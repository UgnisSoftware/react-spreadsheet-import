import DataGrid, { DataGridProps } from "react-data-grid"
import { css, Global } from "@emotion/react"
import { useMemo } from "react"

const createGlobalStyleOverride = () => css`
  .rdg.fill-grid {
    block-size: 100%;
  }

  .rdg-cell {
    contain: size layout style paint;
    border-right: 1px solid var(--chakra-colors-neutral-100);
    border-bottom: 1px solid var(--chakra-colors-neutral-100);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .rdg-static .rdg-cell {
    border-right: none;
    background-color: inherit;
    --selection-color: none;
  }

  .rdg-header-row .rdg-cell {
    --selection-color: none;
    border: none;
  }

  .rdg-row:last-child .rdg-cell {
    border-bottom: none;
  }

  .rdg-row[aria-selected="true"]:hover {
    background-color: var(--chakra-colors-primary-100);
  }

  .rdg-cell[aria-selected="true"] {
    box-shadow: inset 0 0 0 1px var(--selection-color);
  }

  .rdg-cell-error {
    background-color: var(--chakra-colors-error-50);
    box-shadow: inset 0 0 0 1px var(--chakra-colors-error-100);
  }

  .rdg {
    contain: size layout style paint;
    border-radius: 8px;
    border: none;
    --color: var(--chakra-colors-neutral-800);
    --border-color: transparent;
    --background-color: #fff;
    --header-background-color: var(--chakra-colors-primary-50);
    --row-hover-background-color: var(--chakra-colors-neutral-50);
    --selection-color: var(--chakra-colors-accent-400);
    --row-selected-background-color: var(--chakra-colors-primary-50);
    --font-size: 14px;
  }
`
const ROW_HEIGHT = 35

interface Props<Data> extends DataGridProps<Data> {
  rowHeight?: number
}

export const EditableTable = <Data extends {}>({ rowHeight = ROW_HEIGHT, className, ...props }: Props<Data>) => {
  const globalStyleOverride = useMemo(() => createGlobalStyleOverride(), [])

  return (
    <>
      <Global styles={globalStyleOverride} />
      <DataGrid
        className={"rdg-light fill-grid " + className}
        rowHeight={rowHeight}
        {...props}
      />
    </>
  )
}
