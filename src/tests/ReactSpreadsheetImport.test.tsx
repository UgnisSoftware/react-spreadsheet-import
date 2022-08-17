import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ReactSpreadsheetImport } from "../ReactSpreadsheetImport"
import { mockRsiValues } from "../stories/mockRsiValues"

test("Should throw error if no fields are provided", async () => {
  const errorRender = () => render(<ReactSpreadsheetImport {...mockRsiValues} fields={undefined} />)

  expect(errorRender).toThrow()
})
