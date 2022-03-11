import "@testing-library/jest-dom"
import { render, waitFor, screen } from "@testing-library/react"
import { SelectSheetStep } from "../SelectSheetStep"
import { defaultTheme } from "../../../ReactSpreadsheetImport"
import { mockRsiValues } from "../../../stories/mockRsiValues"
import { Providers } from "../../../components/Providers"
import { ModalWrapper } from "../../../components/ModalWrapper"
import userEvent from "@testing-library/user-event"

test("Select sheet and click next", async () => {
  const sheetNames = ["Sheet1", "Sheet2"]
  const selectSheetIndex = 1

  const onContinue = jest.fn()
  render(
    <Providers theme={defaultTheme} rsiValues={mockRsiValues}>
      <ModalWrapper isOpen={true} onClose={() => {}}>
        <SelectSheetStep sheetNames={sheetNames} onContinue={onContinue} />
      </ModalWrapper>
    </Providers>,
  )

  const firstRadio = screen.getByLabelText(sheetNames[selectSheetIndex])

  userEvent.click(firstRadio)

  const nextButton = screen.getByRole("button", {
    name: "Next",
  })

  userEvent.click(nextButton)

  await waitFor(() => {
    expect(onContinue).toBeCalled()
    expect(onContinue.mock.calls[0][0]).toEqual(sheetNames[selectSheetIndex])
  })
})
