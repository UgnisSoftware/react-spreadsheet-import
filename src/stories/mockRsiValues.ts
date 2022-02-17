import type { Field, RsiProps } from "../types"

const fields: Field[] = [
  {
    label: "Name",
    key: "name",
    matches: ["first name"],
    fieldType: {
      type: "input",
    },
    examples: ["Teddy", "John", "Stephanie"],
  },
  {
    label: "Surname",
    key: "name",
    matches: ["second name"],
    fieldType: {
      type: "input",
    },
    examples: ["McDonald", "Smith", "Chomsky"],
  },
  {
    label: "Age",
    key: "age",
    matches: ["oldness"],
    fieldType: {
      type: "input",
    },
    examples: ["23", "77", "99"],
  },
]

export const mockRsiValues: RsiProps = {
  fields: fields,
  onSubmit: () => {},
  isOpen: true,
  onClose: () => {},
  config: {},
}
