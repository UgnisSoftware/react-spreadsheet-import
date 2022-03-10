import "@testing-library/jest-dom"
import { render, fireEvent, waitFor, screen } from "@testing-library/react"
import { UploadStep } from "../UploadStep"
import { theme } from "../../../ReactSpreadsheetImport"
import { mockRsiValues } from "../../../stories/mockRsiValues"
import { Providers } from "../../../components/Providers"
import { ModalWrapper } from "../../../components/ModalWrapper"

test("loads and displays greeting", async () => {
  const file = new File(["Hello, Hello, Hello, Hello"], "test.csv", { type: "text/csv" })

  const onContinue = jest.fn()
  render(
    <Providers theme={theme} rsiValues={mockRsiValues}>
      <ModalWrapper isOpen={true} onClose={() => {}}>
        <UploadStep onContinue={onContinue} />
      </ModalWrapper>
    </Providers>,
  )

  let uploader = screen.getByTestId("rsi-dropzone")

  fireEvent.drop(uploader, {
    target: { files: [file] },
  })

  await waitFor(() => {
    expect(onContinue).toBeCalled()
  })
})
