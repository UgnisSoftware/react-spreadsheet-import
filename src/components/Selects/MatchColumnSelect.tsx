import { rootId } from "../Providers"
import { ChakraStylesConfig, Select } from "chakra-react-select"
import type { SelectOption } from "../../types"

const chakraSelectStyles: ChakraStylesConfig<SelectOption> = {
  dropdownIndicator: (provided) => ({
    ...provided,
    background: "none",
    border: "none",
    p: 0,
    w: "40px",
  }),
  control: (provided) => ({
    ...provided,
    background: "none",
    borderRadius: "6px",
    p: 0,
    _focus: undefined,
  }),
  input: (provided) => ({
    ...provided,
    background: "none",
    border: "none",
    p: 0,
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    opacity: 0,
  }),
  singleValue: (provided) => ({
    ...provided,
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    color: !state.hasValue ? "gray.400" : provided.color,
  }),
  menu: (provided) => ({
    ...provided,
    p: 0,
    mt: 0,
  }),
  option: (provided, state) => ({
    ...provided,
    bg: state.isSelected ? "var(--chakra-colors-rsi-500)" : provided.bg,
  }),
}

interface Props {
  onChange: (value: SelectOption | null) => void
  value?: SelectOption
  options: readonly SelectOption[]
  placeholder?: string
}

export const MatchColumnSelect = ({ onChange, value, options, placeholder }: Props) => (
  <Select
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    closeMenuOnScroll
    menuPosition="fixed"
    menuPortalTarget={document.getElementById(rootId)}
    options={options}
    chakraStyles={chakraSelectStyles}
  />
)
