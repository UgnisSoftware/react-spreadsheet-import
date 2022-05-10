import "@testing-library/jest-dom"
import { render, waitFor, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ReactSpreadsheetImport } from "../ReactSpreadsheetImport"
import { mockRsiValues } from "../stories/mockRsiValues"

test("Close modal", async () => {
  const onClose = jest.fn()
  render(<ReactSpreadsheetImport {...mockRsiValues} onClose={onClose} />)

  const closeButton = screen.getByLabelText("Close modal")

  userEvent.click(closeButton)

  const confirmButton = screen.getByRole("button", {
    name: "Exit flow",
  })

  userEvent.click(confirmButton)

  await waitFor(() => {
    expect(onClose).toBeCalled()
  })
})

test("Close modal", async () => {
  const errorRender = () => render(<ReactSpreadsheetImport {...mockRsiValues} fields={undefined} />)

  expect(errorRender).toThrow()
})
