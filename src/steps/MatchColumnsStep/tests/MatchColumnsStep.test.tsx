import "@testing-library/jest-dom"
import { render, waitFor, screen } from "@testing-library/react"
import { MatchColumnsStep } from "../MatchColumnsStep"
import { defaultTheme } from "../../../ReactSpreadsheetImport"
import { mockRsiValues } from "../../../stories/mockRsiValues"
import { Providers } from "../../../components/Providers"
import { ModalWrapper } from "../../../components/ModalWrapper"
import userEvent from "@testing-library/user-event"
import type { Fields } from "../../../types"

const fields: Fields<any> = [
  {
    label: "Name",
    key: "name",
    alternateMatches: ["first name", "first"],
    fieldType: {
      type: "input",
    },
    example: "Stephanie",
  },
]

test("Match columns and click next", async () => {
  const header = ["Name", "Phone", "Email"]
  const data = [
    ["John", "123", "j@j.com"],
    ["Dane", "333", "dane@bane.com"],
    ["Kane", "534", "kane@linch.com"],
  ]
  // finds only names with automatic matching
  const result = [{ name: data[0][0] }, { name: data[1][0] }, { name: data[2][0] }]

  const onContinue = jest.fn()
  render(
    <Providers theme={defaultTheme} rsiValues={{ ...mockRsiValues, fields }}>
      <ModalWrapper isOpen={true} onClose={() => {}}>
        <MatchColumnsStep headerValues={header} data={data} onContinue={onContinue} />
      </ModalWrapper>
    </Providers>,
  )

  const nextButton = screen.getByRole("button", {
    name: "Next",
  })

  userEvent.click(nextButton)

  await waitFor(() => {
    expect(onContinue).toBeCalled()
    expect(onContinue.mock.calls[0][0]).toEqual(result)
  })
})
