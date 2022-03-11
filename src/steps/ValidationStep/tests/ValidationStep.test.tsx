import "@testing-library/jest-dom"
import { render, waitFor, screen } from "@testing-library/react"
import { ValidationStep } from "../ValidationStep"
import { defaultTheme } from "../../../ReactSpreadsheetImport"
import { mockRsiValues } from "../../../stories/mockRsiValues"
import { Providers } from "../../../components/Providers"
import { ModalWrapper } from "../../../components/ModalWrapper"
import userEvent from "@testing-library/user-event";

test("Submit data", async () => {
  const onSubmit = jest.fn()
  render(
    <Providers theme={defaultTheme} rsiValues={{...mockRsiValues, onSubmit: onSubmit}}>
      <ModalWrapper isOpen={true} onClose={() => {}} >
        <ValidationStep initialData={[]}/>
      </ModalWrapper>
    </Providers>,
  )

  const finishButton = screen.getByRole("button", {
    name: "Confirm",
  })

  userEvent.click(finishButton)

  await waitFor(() => {
    expect(onSubmit).toBeCalled()
  })
})
