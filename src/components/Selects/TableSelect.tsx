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
    border: "none",
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
    marginInlineStart: 0,
  }),
  valueContainer: (provided) => ({
    ...provided,
    p: 0,
    pl: 2,
    color: "gray.400",
  }),
  menu: (provided) => ({
    ...provided,
    p: 0,
    mt: 0,
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "gray.900" : provided.color,
    bg: state.isSelected ? "gray.200" : provided.bg,
  }),
}

interface Props {
  onChange: (value: SelectOption | null) => void
  value?: SelectOption
  options: readonly SelectOption[]
}

export const TableSelect = ({ onChange, value, options }: Props) => (
  <Select
    autoFocus
    size="sm"
    value={value}
    onChange={onChange}
    placeholder=" "
    closeMenuOnScroll
    menuPosition="fixed"
    menuIsOpen
    menuPortalTarget={document.getElementById(rootId)}
    options={options}
    chakraStyles={chakraSelectStyles}
  />
)
