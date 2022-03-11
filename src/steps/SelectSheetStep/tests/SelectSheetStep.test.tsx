import "@testing-library/jest-dom"
import { render, fireEvent, waitFor, screen } from "@testing-library/react"
import { SelectSheetStep } from "../SelectSheetStep"
import { theme } from "../../../ReactSpreadsheetImport"
import { mockRsiValues } from "../../../stories/mockRsiValues"
import { Providers } from "../../../components/Providers"
import { ModalWrapper } from "../../../components/ModalWrapper"

test("Select sheet and click next", async () => {
  const sheetNames = ["Sheet1", "Sheet2"]
  const selectSheetIndex = 1

  const onContinue = jest.fn()
  render(
    <Providers theme={theme} rsiValues={mockRsiValues}>
      <ModalWrapper isOpen={true} onClose={() => {}}>
        <SelectSheetStep sheetNames={sheetNames} onContinue={onContinue} />
      </ModalWrapper>
    </Providers>,
  )

  const firstRadio = screen.getByLabelText(sheetNames[selectSheetIndex])

  fireEvent.click(firstRadio)

  const nextButton = screen.getByRole("button", {
    name: "Next",
  })

  fireEvent.click(nextButton)

  await waitFor(() => {
    expect(onContinue).toBeCalled()
    expect(onContinue.mock.calls[0][0]).toEqual(sheetNames[selectSheetIndex])
  })
})
