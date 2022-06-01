import "@testing-library/jest-dom"
import { render, waitFor, screen, fireEvent } from "@testing-library/react"
import { SelectHeaderStep } from "../SelectHeaderStep"
import { defaultTheme, ReactSpreadsheetImport } from "../../../ReactSpreadsheetImport"
import { mockRsiValues } from "../../../stories/mockRsiValues"
import { Providers } from "../../../components/Providers"
import { ModalWrapper } from "../../../components/ModalWrapper"
import userEvent from "@testing-library/user-event"
import { readFileSync } from "fs"
import { StepType } from "../../UploadFlow"

const MUTATED_HEADER = "mutated header"
const CONTINUE_BUTTON = "Next"

test("Select header row and click next", async () => {
  const data = [
    ["Some random header"],
    ["2030"],
    ["Name", "Phone", "Email"],
    ["John", "123", "j@j.com"],
    ["Dane", "333", "dane@bane.com"],
  ]
  const selectRowIndex = 2

  const onContinue = jest.fn()
  render(
    <Providers theme={defaultTheme} rsiValues={mockRsiValues}>
      <ModalWrapper isOpen={true} onClose={() => {}}>
        <SelectHeaderStep data={data} onContinue={onContinue} />
      </ModalWrapper>
    </Providers>,
  )

  const radioButtons = screen.getAllByRole("radio")

  userEvent.click(radioButtons[selectRowIndex])

  const nextButton = screen.getByRole("button", {
    name: "Next",
  })

  userEvent.click(nextButton)

  await waitFor(() => {
    expect(onContinue).toBeCalled()
  })
  expect(onContinue.mock.calls[0][0]).toEqual(data[selectRowIndex])
  expect(onContinue.mock.calls[0][1]).toEqual(data.slice(selectRowIndex + 1))
})

test("selectHeaderStepHook should be called after header is selected", async () => {
  const selectHeaderStepHook = jest.fn(async (headerValues, data) => {
    return { headerValues, data }
  })
  render(<ReactSpreadsheetImport {...mockRsiValues} selectHeaderStepHook={selectHeaderStepHook} />)
  const uploader = screen.getByTestId("rsi-dropzone")
  const data = readFileSync(__dirname + "/../../../../static/Workbook2.xlsx")
  fireEvent.drop(uploader, {
    target: {
      files: [
        new File([data], "testFile.xlsx", {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }),
      ],
    },
  })
  const continueButton = await screen.findByText(CONTINUE_BUTTON, undefined, { timeout: 5000 })
  fireEvent.click(continueButton)
  await waitFor(() => {
    expect(selectHeaderStepHook).toBeCalledWith(
      ["name", "age"],
      [
        ["Josh", "2"],
        ["Charlie", "3"],
        ["Lena", "50"],
      ],
    )
  })
})
test("selectHeaderStepHook should be able to modify raw data", async () => {
  const selectHeaderStepHook = jest.fn(async ([val, ...headerValues], data) => {
    return { headerValues: [MUTATED_HEADER, ...headerValues], data }
  })
  render(
    <ReactSpreadsheetImport
      {...mockRsiValues}
      selectHeaderStepHook={selectHeaderStepHook}
      initialStepState={{
        type: StepType.selectHeader,
        data: [
          ["name", "age"],
          ["Josh", "2"],
          ["Charlie", "3"],
          ["Lena", "50"],
        ],
      }}
    />,
  )
  const continueButton = screen.getByText(CONTINUE_BUTTON)
  fireEvent.click(continueButton)
  const mutatedHeader = await screen.findByText(MUTATED_HEADER)

  await waitFor(() => {
    expect(mutatedHeader).toBeInTheDocument()
  })
})
