import type { Field, RsiProps } from "../types"

const fields: Field<any>[] = [
  {
    label: "Name",
    key: "name",
    alternateMatches: ["first name"],
    fieldType: {
      type: "input",
    },
    examples: ["Teddy", "John", "Stephanie"],
  },
  {
    label: "Surname",
    key: "surname",
    alternateMatches: ["second name"],
    fieldType: {
      type: "input",
    },
    examples: ["McDonald", "Smith", "Chomsky"],
  },
  {
    label: "Age",
    key: "age",
    alternateMatches: ["oldness"],
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
}
