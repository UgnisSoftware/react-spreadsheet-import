import { ReactSpreadsheetImport } from "@/ReactSpreadsheetImport"
import { mockRsiValues } from "@/stories/mockRsiValues"
import userEvent from "@testing-library/user-event"
import { expect, test } from "vitest"
import { render } from "./test-utils"

test("Close modal", async () => {
  let isOpen = true

  const onClose = vi.fn(() => {
    isOpen = !isOpen
  })
  const { getByText, getByLabelText } = render(
    <ReactSpreadsheetImport {...mockRsiValues} onClose={onClose} isOpen={isOpen} />,
  )

  const closeButton = getByLabelText("Close modal")

  await userEvent.click(closeButton)

  const confirmButton = getByText("Exit flow")

  await userEvent.click(confirmButton)
  expect(onClose).toBeCalled()
})
