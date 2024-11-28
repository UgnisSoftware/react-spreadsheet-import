import "@testing-library/jest-dom"
import { render, waitFor, screen, act } from "@testing-library/react"
import { ValidationStep } from "../ValidationStep"
import { defaultRSIProps, defaultTheme } from "../../../ReactSpreadsheetImport"
import { Providers } from "../../../components/Providers"
import { ModalWrapper } from "../../../components/ModalWrapper"
import userEvent from "@testing-library/user-event"
import { translations } from "../../../translationsRSIProps"
import { addErrorsAndRunHooks } from "../utils/dataMutations"
import { Fields, RowHook, TableHook } from "../../../types"

type fieldKeys<T extends Fields<string>> = T[number]["key"]

const mockValues = {
  ...defaultRSIProps,
  fields: [],
  onSubmit: () => {},
  isOpen: true,
  onClose: () => {},
} as const

const getFilterSwitch = () =>
  screen.getByRole("checkbox", {
    name: translations.validationStep.filterSwitchTitle,
  })

const file = new File([""], "file.csv")

describe("Validation step tests", () => {
  test("Submit data", async () => {
    const onSubmit = jest.fn()
    render(
      <Providers theme={defaultTheme} rsiValues={{ ...mockValues, onSubmit: onSubmit }}>
        <ModalWrapper isOpen={true} onClose={() => {}}>
          <ValidationStep initialData={[]} file={file} />
        </ModalWrapper>
      </Providers>,
    )

    const finishButton = screen.getByRole("button", {
      name: "Confirm",
    })

    await userEvent.click(finishButton)

    await waitFor(() => {
      expect(onSubmit).toBeCalledWith({ all: [], invalidData: [], validData: [] }, file)
    })
  })

  test("Submit data without returning promise", async () => {
    const onSuccess = jest.fn()
    const onSubmit = jest.fn(() => {
      onSuccess()
    })
    const onClose = jest.fn()
    render(
      <Providers theme={defaultTheme} rsiValues={{ ...mockValues, onSubmit, onClose }}>
        <ModalWrapper isOpen={true} onClose={() => {}}>
          <ValidationStep initialData={[]} file={file} />
        </ModalWrapper>
      </Providers>,
    )

    const finishButton = screen.getByRole("button", {
      name: "Confirm",
    })

    await userEvent.click(finishButton)

    await waitFor(() => {
      expect(onSubmit).toBeCalledWith({ all: [], invalidData: [], validData: [] }, file)
    })
    await waitFor(() => {
      expect(onSuccess).toBeCalled()
      expect(onClose).toBeCalled()
    })
  })

  test("Submit data with a successful async return", async () => {
    const onSuccess = jest.fn()
    const onSubmit = jest.fn(async (): Promise<void> => {
      onSuccess()
      return Promise.resolve()
    })
    const onClose = jest.fn()
    render(
      <Providers theme={defaultTheme} rsiValues={{ ...mockValues, onSubmit, onClose }}>
        <ModalWrapper isOpen={true} onClose={() => {}}>
          <ValidationStep initialData={[]} file={file} />
        </ModalWrapper>
      </Providers>,
    )

    const finishButton = screen.getByRole("button", {
      name: "Confirm",
    })

    await userEvent.click(finishButton)

    await waitFor(() => {
      expect(onSubmit).toBeCalledWith({ all: [], invalidData: [], validData: [] }, file)
    })
    await waitFor(() => {
      expect(onSuccess).toBeCalled()
      expect(onClose).toBeCalled()
    })
  })

  test("Submit data with a unsuccessful async return", async () => {
    const ERROR_MESSAGE = "ERROR has occurred"
    const onReject = jest.fn()
    const onSubmit = jest.fn(async (): Promise<void> => {
      onReject()
      throw new Error(ERROR_MESSAGE)
    })
    const onClose = jest.fn()

    render(
      <Providers theme={defaultTheme} rsiValues={{ ...mockValues, onSubmit, onClose }}>
        <ModalWrapper isOpen={true} onClose={() => {}}>
          <ValidationStep initialData={[]} file={file} />
        </ModalWrapper>
      </Providers>,
    )

    const finishButton = screen.getByRole("button", {
      name: "Confirm",
    })

    await userEvent.click(finishButton)

    await waitFor(() => {
      expect(onSubmit).toBeCalledWith({ all: [], invalidData: [], validData: [] }, file)
    })

    const errorToast = await screen.findAllByText(ERROR_MESSAGE, undefined, { timeout: 5000 })

    expect(onReject).toBeCalled()
    expect(errorToast?.[0]).toBeInTheDocument()
    expect(onClose).not.toBeCalled()
  })

  test("Filters rows with required errors", async () => {
    const UNIQUE_NAME = "very unique name"
    const fields = [
      {
        label: "Name",
        key: "name",
        fieldType: {
          type: "input",
        },
        validations: [
          {
            rule: "required",
            errorMessage: "Name is required",
          },
        ],
      },
    ] as const
    const initialData = await addErrorsAndRunHooks(
      [
        {
          name: UNIQUE_NAME,
        },
        {
          name: undefined,
        },
      ],
      fields,
    )
    render(
      <Providers theme={defaultTheme} rsiValues={{ ...mockValues, fields }}>
        <ModalWrapper isOpen={true} onClose={() => {}}>
          <ValidationStep<fieldKeys<typeof fields>> initialData={initialData} file={file} />
        </ModalWrapper>
      </Providers>,
    )

    const allRowsWithHeader = await screen.findAllByRole("row")
    expect(allRowsWithHeader).toHaveLength(3)

    const validRow = screen.getByText(UNIQUE_NAME)
    expect(validRow).toBeInTheDocument()

    const switchFilter = getFilterSwitch()

    await userEvent.click(switchFilter)

    const filteredRowsWithHeader = await screen.findAllByRole("row")
    expect(filteredRowsWithHeader).toHaveLength(2)
  })

  test("Filters rows with errors, fixes row, removes filter", async () => {
    const UNIQUE_NAME = "very unique name"
    const SECOND_UNIQUE_NAME = "another unique name"
    const FINAL_NAME = "just name"

    const fields = [
      {
        label: "Name",
        key: "name",
        fieldType: {
          type: "input",
        },
        validations: [
          {
            rule: "required",
            errorMessage: "Name is required",
          },
        ],
      },
    ] as const
    const initialData = await addErrorsAndRunHooks(
      [
        {
          name: UNIQUE_NAME,
        },
        {
          name: undefined,
        },
        {
          name: SECOND_UNIQUE_NAME,
        },
      ],
      fields,
    )
    const onSubmit = jest.fn()
    render(
      <Providers theme={defaultTheme} rsiValues={{ ...mockValues, fields, onSubmit }}>
        <ModalWrapper isOpen={true} onClose={() => {}}>
          <ValidationStep<fieldKeys<typeof fields>> initialData={initialData} file={file} />
        </ModalWrapper>
      </Providers>,
    )

    const allRowsWithHeader = await screen.findAllByRole("row")
    expect(allRowsWithHeader).toHaveLength(4)

    const validRow = screen.getByText(UNIQUE_NAME)
    expect(validRow).toBeInTheDocument()

    const switchFilter = getFilterSwitch()

    await userEvent.click(switchFilter)

    const filteredRowsWithHeader = await screen.findAllByRole("row")
    expect(filteredRowsWithHeader).toHaveLength(2)

    // don't really know another way to select an empty cell
    const emptyCell = screen.getAllByRole("gridcell", { name: undefined })[1]
    await userEvent.click(emptyCell)

    await userEvent.keyboard(FINAL_NAME + "{enter}")

    const filteredRowsNoErrorsWithHeader = await screen.findAllByRole("row")
    expect(filteredRowsNoErrorsWithHeader).toHaveLength(1)

    await userEvent.click(switchFilter)

    const allRowsFixedWithHeader = await screen.findAllByRole("row")
    expect(allRowsFixedWithHeader).toHaveLength(4)

    const finishButton = screen.getByRole("button", {
      name: "Confirm",
    })

    await userEvent.click(finishButton)

    await waitFor(() => {
      expect(onSubmit).toBeCalled()
    })
  })

  test("Filters rows with unique errors", async () => {
    const NON_UNIQUE_NAME = "very unique name"
    const fields = [
      {
        label: "Name",
        key: "name",
        fieldType: {
          type: "input",
        },
        validations: [
          {
            rule: "unique",
            errorMessage: "Name must be unique",
          },
        ],
      },
    ] as const
    const initialData = await addErrorsAndRunHooks(
      [
        {
          name: NON_UNIQUE_NAME,
        },
        {
          name: NON_UNIQUE_NAME,
        },
        {
          name: "I am fine",
        },
      ],
      fields,
    )
    render(
      <Providers theme={defaultTheme} rsiValues={{ ...mockValues, fields }}>
        <ModalWrapper isOpen={true} onClose={() => {}}>
          <ValidationStep<fieldKeys<typeof fields>> initialData={initialData} file={file} />
        </ModalWrapper>
      </Providers>,
    )

    const allRowsWithHeader = await screen.findAllByRole("row")
    expect(allRowsWithHeader).toHaveLength(4)

    const switchFilter = getFilterSwitch()

    await userEvent.click(switchFilter)

    const filteredRowsWithHeader = await screen.findAllByRole("row")
    expect(filteredRowsWithHeader).toHaveLength(3)
  })
  test("Filters rows with regex errors", async () => {
    const NOT_A_NUMBER = "not a number"
    const fields = [
      {
        label: "Name",
        key: "name",
        fieldType: {
          type: "input",
        },
        validations: [
          {
            rule: "regex",
            errorMessage: "Name must be unique",
            value: "^[0-9]*$",
          },
        ],
      },
    ] as const
    const initialData = await addErrorsAndRunHooks(
      [
        {
          name: NOT_A_NUMBER,
        },
        {
          name: "1234",
        },
        {
          name: "9999999",
        },
      ],
      fields,
    )
    render(
      <Providers theme={defaultTheme} rsiValues={{ ...mockValues, fields }}>
        <ModalWrapper isOpen={true} onClose={() => {}}>
          <ValidationStep<fieldKeys<typeof fields>> initialData={initialData} file={file} />
        </ModalWrapper>
      </Providers>,
    )

    const allRowsWithHeader = await screen.findAllByRole("row")
    expect(allRowsWithHeader).toHaveLength(4)

    const switchFilter = getFilterSwitch()

    await userEvent.click(switchFilter)

    const filteredRowsWithHeader = await screen.findAllByRole("row")
    expect(filteredRowsWithHeader).toHaveLength(2)
  })

  test("Deletes selected rows", async () => {
    const FIRST_DELETE = "first"
    const SECOND_DELETE = "second"
    const THIRD = "third"

    const fields = [
      {
        label: "Name",
        key: "name",
        fieldType: {
          type: "input",
        },
      },
    ] as const
    const initialData = await addErrorsAndRunHooks(
      [
        {
          name: FIRST_DELETE,
        },
        {
          name: SECOND_DELETE,
        },
        {
          name: THIRD,
        },
      ],
      fields,
    )
    render(
      <Providers theme={defaultTheme} rsiValues={{ ...mockValues, fields }}>
        <ModalWrapper isOpen={true} onClose={() => {}}>
          <ValidationStep<fieldKeys<typeof fields>> initialData={initialData} file={file} />
        </ModalWrapper>
      </Providers>,
    )

    const allRowsWithHeader = await screen.findAllByRole("row")
    expect(allRowsWithHeader).toHaveLength(4)

    const switchFilters = screen.getAllByRole("checkbox", {
      name: "Select",
    })

    await userEvent.click(switchFilters[0])
    await userEvent.click(switchFilters[1])

    const discardButton = screen.getByRole("button", {
      name: "Discard selected rows",
    })

    await userEvent.click(discardButton)

    const filteredRowsWithHeader = await screen.findAllByRole("row")
    expect(filteredRowsWithHeader).toHaveLength(2)

    const validRow = screen.getByText(THIRD)
    expect(validRow).toBeInTheDocument()
  })

  test("Deletes selected rows, changes the last one", async () => {
    const FIRST_DELETE = "first"
    const SECOND_DELETE = "second"
    const THIRD = "third"
    const THIRD_CHANGED = "third_changed"

    const fields = [
      {
        label: "Name",
        key: "name",
        fieldType: {
          type: "input",
        },
      },
    ] as const
    const initialData = await addErrorsAndRunHooks(
      [
        {
          name: FIRST_DELETE,
        },
        {
          name: SECOND_DELETE,
        },
        {
          name: THIRD,
        },
      ],
      fields,
    )
    render(
      <Providers theme={defaultTheme} rsiValues={{ ...mockValues, fields }}>
        <ModalWrapper isOpen={true} onClose={() => {}}>
          <ValidationStep<fieldKeys<typeof fields>> initialData={initialData} file={file} />
        </ModalWrapper>
      </Providers>,
    )

    const allRowsWithHeader = await screen.findAllByRole("row")
    expect(allRowsWithHeader).toHaveLength(4)

    const switchFilters = screen.getAllByRole("checkbox", {
      name: "Select",
    })

    await userEvent.click(switchFilters[0])
    await userEvent.click(switchFilters[1])

    const discardButton = screen.getByRole("button", {
      name: "Discard selected rows",
    })

    await userEvent.click(discardButton)

    const filteredRowsWithHeader = await screen.findAllByRole("row")
    expect(filteredRowsWithHeader).toHaveLength(2)

    const nameCell = screen.getByRole("gridcell", {
      name: THIRD,
    })

    await userEvent.click(nameCell)

    screen.getByRole<HTMLInputElement>("textbox")
    await userEvent.keyboard(THIRD_CHANGED + "{enter}")

    const validRow = screen.getByText(THIRD_CHANGED)
    expect(validRow).toBeInTheDocument()
  })

  test("All inputs change values", async () => {
    const NAME = "John"
    const NEW_NAME = "Johnny"
    const OPTIONS = [
      { value: "one", label: "ONE" },
      { value: "two", label: "TWO" },
    ] as const
    const fields = [
      {
        label: "Name",
        key: "name",
        fieldType: {
          type: "input",
        },
      },
      {
        label: "lastName",
        key: "lastName",
        fieldType: {
          type: "select",
          options: OPTIONS,
        },
      },
      {
        label: "is cool",
        key: "is_cool",
        fieldType: {
          type: "checkbox",
        },
      },
    ] as const
    const initialData = await addErrorsAndRunHooks(
      [
        {
          name: NAME,
          lastName: OPTIONS[0].value,
          is_cool: false,
        },
      ],
      fields,
    )
    render(
      <Providers
        theme={defaultTheme}
        rsiValues={{
          ...mockValues,
          fields,
        }}
      >
        <ModalWrapper isOpen={true} onClose={() => {}}>
          <ValidationStep<fieldKeys<typeof fields>> initialData={initialData} file={file} />
        </ModalWrapper>
      </Providers>,
    )

    // input
    const nameCell = screen.getByRole("gridcell", {
      name: NAME,
    })

    await userEvent.click(nameCell)

    const input: HTMLInputElement | null = screen.getByRole<HTMLInputElement>("textbox")

    expect(input).toHaveValue(NAME)
    expect(input).toHaveFocus()
    expect(input.selectionStart).toBe(0)
    expect(input.selectionEnd).toBe(NAME.length)

    await userEvent.keyboard(NEW_NAME + "{enter}")
    expect(input).not.toBeInTheDocument()

    const newNameCell = screen.getByRole("gridcell", {
      name: NEW_NAME,
    })
    expect(newNameCell).toBeInTheDocument()

    // select
    const lastNameCell = screen.getByRole("gridcell", {
      name: OPTIONS[0].label,
    })
    await userEvent.click(lastNameCell)

    const newOption = screen.getByRole("button", {
      name: OPTIONS[1].label,
    })
    await userEvent.click(newOption)
    expect(newOption).not.toBeInTheDocument()

    const newLastName = screen.getByRole("gridcell", {
      name: OPTIONS[1].label,
    })
    expect(newLastName).toBeInTheDocument()

    // Boolean
    const checkbox = screen.getByRole("checkbox", {
      name: "",
    })

    expect(checkbox).not.toBeChecked()

    await userEvent.click(checkbox)

    expect(checkbox).toBeChecked()
  })

  test("Row hook transforms data", async () => {
    const NAME = "John"
    const LASTNAME = "Doe"
    const NEW_NAME = "Johnny"
    const NEW_LASTNAME = "CENA"

    const fields = [
      {
        label: "Name",
        key: "name",
        fieldType: {
          type: "input",
        },
      },
      {
        label: "lastName",
        key: "lastName",
        fieldType: {
          type: "input",
        },
      },
    ] as const
    const rowHook: RowHook<fieldKeys<typeof fields>> = (value) => ({
      name: value.name?.toString()?.split(/(\s+)/)[0],
      lastName: value.name?.toString()?.split(/(\s+)/)[2],
    })
    const initialData = await addErrorsAndRunHooks(
      [
        {
          name: NAME + " " + LASTNAME,
          lastName: undefined,
        },
      ],
      fields,
      rowHook,
    )
    await act(async () => {
      render(
        <Providers
          theme={defaultTheme}
          rsiValues={{
            ...mockValues,
            fields,
            rowHook,
          }}
        >
          <ModalWrapper isOpen={true} onClose={() => {}}>
            <ValidationStep<fieldKeys<typeof fields>> initialData={initialData} file={file} />
          </ModalWrapper>
        </Providers>,
      )
    })

    const nameCell = screen.getByRole("gridcell", {
      name: NAME,
    })
    expect(nameCell).toBeInTheDocument()
    const lastNameCell = screen.getByRole("gridcell", {
      name: LASTNAME,
    })
    expect(lastNameCell).toBeInTheDocument()

    // activate input
    await userEvent.click(nameCell)

    await userEvent.keyboard(NEW_NAME + " " + NEW_LASTNAME + "{enter}")

    const newNameCell = screen.getByRole("gridcell", {
      name: NEW_NAME,
    })
    expect(newNameCell).toBeInTheDocument()
    const newLastNameCell = screen.getByRole("gridcell", {
      name: NEW_LASTNAME,
    })
    expect(newLastNameCell).toBeInTheDocument()
  })

  test("Row hook only runs on a single row", async () => {
    const NAME = "John"
    const NEW_NAME = "Kate"
    const LAST_NAME = "Doe"
    const fields = [
      {
        label: "Name",
        key: "name",
        fieldType: {
          type: "input",
        },
      },
      {
        label: "lastName",
        key: "lastName",
        fieldType: {
          type: "input",
        },
      },
    ] as const
    const mockedHook = jest.fn((a) => a)
    const initialData = await addErrorsAndRunHooks(
      [
        {
          name: NAME,
          lastName: LAST_NAME,
        },
        {
          name: "Johnny",
          lastName: "Doeson",
        },
      ],
      fields,
      mockedHook,
    )
    await act(async () => {
      render(
        <Providers
          theme={defaultTheme}
          rsiValues={{
            ...mockValues,
            fields,
            rowHook: mockedHook,
          }}
        >
          <ModalWrapper isOpen={true} onClose={() => {}}>
            <ValidationStep<fieldKeys<typeof fields>> initialData={initialData} file={file} />
          </ModalWrapper>
        </Providers>,
      )
    })

    // initially row hook is called for each row
    expect(mockedHook.mock.calls.length).toBe(2)

    const nameCell = screen.getByRole("gridcell", {
      name: NAME,
    })
    expect(nameCell).toBeInTheDocument()

    // activate input
    await userEvent.click(nameCell)

    await userEvent.keyboard(NEW_NAME + "{enter}")

    expect(mockedHook.mock.calls[2][0]?.name).toBe(NEW_NAME)
    expect(mockedHook.mock.calls.length).toBe(3)
  })

  test("Row hook raises error", async () => {
    const WRONG_NAME = "Johnny"
    const RIGHT_NAME = "Jonathan"
    const fields = [
      {
        label: "Name",
        key: "name",
        fieldType: {
          type: "input",
        },
      },
    ] as const

    const rowHook: RowHook<fieldKeys<typeof fields>> = (value, setError) => {
      if (value.name === WRONG_NAME) {
        setError(fields[0].key, { message: "Wrong name", level: "error" })
      }
      return value
    }
    const initialData = await addErrorsAndRunHooks(
      [
        {
          name: WRONG_NAME,
        },
      ],
      fields,
      rowHook,
    )
    await act(async () =>
      render(
        <Providers
          theme={defaultTheme}
          rsiValues={{
            ...mockValues,
            fields,
            rowHook,
          }}
        >
          <ModalWrapper isOpen={true} onClose={() => {}}>
            <ValidationStep<fieldKeys<typeof fields>> initialData={initialData} file={file} />
          </ModalWrapper>
        </Providers>,
      ),
    )

    const switchFilter = getFilterSwitch()

    await expect(await screen.findAllByRole("row")).toHaveLength(2)

    await userEvent.click(switchFilter)

    await expect(await screen.findAllByRole("row")).toHaveLength(2)

    const nameCell = screen.getByRole("gridcell", {
      name: WRONG_NAME,
    })
    expect(nameCell).toBeInTheDocument()

    await userEvent.click(nameCell)
    screen.getByRole<HTMLInputElement>("textbox")

    await userEvent.keyboard(RIGHT_NAME + "{enter}")

    await expect(await screen.findAllByRole("row")).toHaveLength(1)
  })

  test("Table hook transforms data", async () => {
    const NAME = "John"
    const SECOND_NAME = "Doe"
    const NEW_NAME = "Jakee"
    const ADDITION = "last"
    const fields = [
      {
        label: "Name",
        key: "name",
        fieldType: {
          type: "input",
        },
      },
    ] as const
    const tableHook: TableHook<fieldKeys<typeof fields>> = (data) =>
      data.map((value) => ({
        name: value.name + ADDITION,
      }))
    const initialData = await addErrorsAndRunHooks(
      [
        {
          name: NAME,
        },
        {
          name: SECOND_NAME,
        },
      ],
      fields,
      undefined,
      tableHook,
    )
    await act(async () => {
      render(
        <Providers
          theme={defaultTheme}
          rsiValues={{
            ...mockValues,
            fields,
            tableHook,
          }}
        >
          <ModalWrapper isOpen={true} onClose={() => {}}>
            <ValidationStep<fieldKeys<typeof fields>> initialData={initialData} file={file} />
          </ModalWrapper>
        </Providers>,
      )
    })

    const nameCell = screen.getByRole("gridcell", {
      name: NAME + ADDITION,
    })
    expect(nameCell).toBeInTheDocument()
    const lastNameCell = screen.getByRole("gridcell", {
      name: SECOND_NAME + ADDITION,
    })
    expect(lastNameCell).toBeInTheDocument()

    // activate input
    await userEvent.click(nameCell)

    await userEvent.keyboard(NEW_NAME + "{enter}")

    const newNameCell = screen.getByRole("gridcell", {
      name: NEW_NAME + ADDITION,
    })
    expect(newNameCell).toBeInTheDocument()
  })
  test("Table hook raises error", async () => {
    const WRONG_NAME = "Johnny"
    const RIGHT_NAME = "Jonathan"
    const fields = [
      {
        label: "Name",
        key: "name",
        fieldType: {
          type: "input",
        },
      },
    ] as const
    const tableHook: TableHook<fieldKeys<typeof fields>> = (data, setError) => {
      data.forEach((value, index) => {
        if (value.name === WRONG_NAME) {
          setError(index, fields[0].key, { message: "Wrong name", level: "error" })
        }
        return value
      })
      return data
    }
    const initialData = await addErrorsAndRunHooks(
      [
        {
          name: WRONG_NAME,
        },
        {
          name: WRONG_NAME,
        },
      ],
      fields,
      undefined,
      tableHook,
    )
    render(
      <Providers
        theme={defaultTheme}
        rsiValues={{
          ...mockValues,
          fields,
          tableHook,
        }}
      >
        <ModalWrapper isOpen={true} onClose={() => {}}>
          <ValidationStep<fieldKeys<typeof fields>> initialData={initialData} file={file} />
        </ModalWrapper>
      </Providers>,
    )

    const switchFilter = getFilterSwitch()

    await expect(await screen.findAllByRole("row")).toHaveLength(3)

    await userEvent.click(switchFilter)

    await expect(await screen.findAllByRole("row")).toHaveLength(3)

    const nameCell = await screen.getAllByRole("gridcell", {
      name: WRONG_NAME,
    })[0]

    await userEvent.click(nameCell)
    screen.getByRole<HTMLInputElement>("textbox")

    await userEvent.keyboard(RIGHT_NAME + "{enter}")

    await expect(await screen.findAllByRole("row")).toHaveLength(2)
  })
  test("Only the table hook is run when enough rows are changed", async () => {
    const fields = [
      {
        label: "Name",
        key: "name",
        fieldType: {
          type: "input",
        },
      },
    ] as const
    let rowHookCalled = false, tableHookCalled = false
    const rowHook: RowHook<fieldKeys<typeof fields>> = (data, setError) => {
      rowHookCalled = true
      return data
    }
    const tableHook: TableHook<fieldKeys<typeof fields>> = (data, setError) => {
      tableHookCalled = true
      return data
    }
    const runTableHookThreshold = 1
    addErrorsAndRunHooks(
      [
        {
          name: "First",
        },
        {
          name: "Second",
        },
      ],
      fields,
      rowHook,
      tableHook,
      runTableHookThreshold,
    )
    expect(rowHookCalled).toBeFalsy()
    expect(tableHookCalled).toBeTruthy()
  })
  test("Only the row hook is run when too few rows are changed", async () => {
    const fields = [
      {
        label: "Name",
        key: "name",
        fieldType: {
          type: "input",
        },
      },
    ] as const
    let rowHookCalled = false, tableHookCalled = false
    const rowHook: RowHook<fieldKeys<typeof fields>> = (data, setError) => {
      rowHookCalled = true
      return data
    }
    const tableHook: TableHook<fieldKeys<typeof fields>> = (data, setError) => {
      tableHookCalled = true
      return data
    }
    const runTableHookThreshold = 10
    addErrorsAndRunHooks(
      [
        {
          name: "First",
        },
        {
          name: "Second",
        },
      ],
      fields,
      rowHook,
      tableHook,
      runTableHookThreshold,
      [0, 1]
    )
    expect(rowHookCalled).toBeTruthy()
    expect(tableHookCalled).toBeFalsy()
  })
})
