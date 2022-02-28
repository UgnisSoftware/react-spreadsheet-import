import type { Field, RsiProps } from "../types"

const fields: Field<any>[] = [
  {
    label: "Name",
    key: "name",
    alternateMatches: ["first name"],
    fieldType: {
      type: "input",
    },
    example: "Stephanie",
  },
  {
    label: "Surname",
    key: "surname",
    alternateMatches: ["second name"],
    fieldType: {
      type: "input",
    },
    example: "McDonald",
    validations: [
      {
        rule: "unique",
        errorMessage: "Last name must be unique",
        level: "info",
      },
    ],
    description: "Family / Last name",
  },
  {
    label: "Age",
    key: "age",
    alternateMatches: ["oldness"],
    fieldType: {
      type: "input",
    },
    example: "23",
    validations: [
      {
        rule: "regex",
        value: "^\\d+$",
        errorMessage: "Age must be a number",
        level: "warning",
      },
    ],
  },
  {
    label: "Team",
    key: "team",
    alternateMatches: ["oldness"],
    fieldType: {
      type: "select",
      options: [
        { label: "Team One", value: "one" },
        { label: "Team Two", value: "two" },
      ],
    },
    example: "Team one",
    validations: [
      {
        rule: "required",
        errorMessage: "Team is required",
      },
    ],
  },
  {
    label: "Is manager",
    key: "is_manager",
    alternateMatches: ["manages"],
    fieldType: {
      type: "checkbox",
    },
    example: "true",
  },
]

export const mockRsiValues: RsiProps = {
  fields: fields,
  onSubmit: (data) => {
    console.log(data)
  },
  isOpen: true,
  onClose: () => {},
}

export const editableTableInitialData = [
  {
    name: "Hello",
    surname: "Hello",
    age: "123123",
    team: "one",
    is_manager: true,
  },
  {
    name: "Hello",
    surname: "Hello",
    age: "12312zsas3",
    team: "two",
    is_manager: true,
  },
  {
    name: "Whooaasdasdawdawdawdiouasdiuasdisdhasd",
    surname: "Hello",
    age: "123123",
    team: undefined,
    is_manager: false,
  },
  {
    name: "Goodbye",
    surname: "Goodbye",
    age: "111",
    team: "two",
    is_manager: true,
  },
]

export const headerSelectionTableFields = [
  ["text", "num", "select", "bool"],
  ["Hello", "123", "one", "true"],
  ["Hello", "123", "one", "true"],
  ["Hello", "123", "one", "true"],
]
