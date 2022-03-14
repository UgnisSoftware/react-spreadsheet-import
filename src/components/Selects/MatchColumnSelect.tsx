import { Select } from "chakra-react-select"
import type { SelectOption } from "../../types"
import React from "react"
import { customComponents } from "./MenuPortal"
import { useStyleConfig } from "@chakra-ui/react"
import type { Styles } from "../../steps/MatchColumnsStep/components/ColumnGrid"
interface Props {
  onChange: (value: SelectOption | null) => void
  value?: SelectOption
  options: readonly SelectOption[]
  placeholder?: string
}

export const MatchColumnSelect = ({ onChange, value, options, placeholder }: Props) => {
  const styles = useStyleConfig("MatchColumnsStep") as Styles
  return (
    <Select
      value={value || null}
      colorScheme={"pink"}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      chakraStyles={styles.select}
      menuPosition="fixed"
      components={customComponents}
    />
  )
}
