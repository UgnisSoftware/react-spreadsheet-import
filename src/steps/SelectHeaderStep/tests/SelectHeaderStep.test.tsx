import "@testing-library/jest-dom"
import { render, waitFor, screen } from "@testing-library/react"
import { SelectHeaderStep } from "../SelectHeaderStep"
import { defaultTheme } from "../../../ReactSpreadsheetImport"
import { mockRsiValues } from "../../../stories/mockRsiValues"
import { Providers } from "../../../components/Providers"
import { ModalWrapper } from "../../../components/ModalWrapper"
import userEvent from "@testing-library/user-event"

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
    expect(onContinue.mock.calls[0][0]).toEqual(data[selectRowIndex])
    expect(onContinue.mock.calls[0][1]).toEqual(data.slice(selectRowIndex + 1))
  })
})
