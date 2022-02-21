import type { Fields, Field, RsiProps } from "../types"

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
    key: "name",
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

export const editableTableInitialData = [
  {
    text: "Hello",
    num: "123123",
    select: "one",
    bool: true,
  },
  {
    text: "Hello",
    num: "12312zsas3",
    select: "two",
    bool: true,
  },
  {
    text: "Whooaasdasdawdawdawdiouasdiuasdisdhasd",
    num: "123123",
    select: undefined,
    bool: false,
  },
  {
    text: "Goodbye",
    num: "111",
    select: "two",
    bool: true,
  },
]

export const editableTableFields: Fields<any> = [
  {
    key: "text",
    label: "Texts",
    fieldType: { type: "input" },
    validations: [
      {
        rule: "unique",
        errorMessage: "Text must be unique",
        level: "info",
      },
    ],
  },
  {
    key: "num",
    label: "Number",
    fieldType: { type: "input" },
    validations: [
      {
        rule: "regex",
        value: "^\\d+$",
        errorMessage: "Test must be a number",
        level: "warning",
      },
    ],
  },
  {
    key: "select",
    label: "Select",
    fieldType: {
      type: "select",
      options: [
        { label: "One", value: "one" },
        { label: "Two", value: "two" },
      ],
    },
    validations: [
      {
        rule: "required",
        errorMessage: "Select is required",
      },
    ],
  },
  {
    key: "bool",
    label: "Bool",
    fieldType: { type: "checkbox" },
  },
]

export const headerSelectionTableFields = [
  ["text", "num", "select", "bool"],
  ["Hello", "123", "one", "true"],
  ["Hello", "123", "one", "true"],
  ["Hello", "123", "one", "true"],
]
