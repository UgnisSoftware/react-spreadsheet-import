import "@testing-library/jest-dom"
import { render, fireEvent, waitFor, screen } from "@testing-library/react"
import { UploadStep } from "../UploadStep"
import { defaultTheme, ReactSpreadsheetImport } from "../../../ReactSpreadsheetImport"
import { mockRsiValues } from "../../../stories/mockRsiValues"
import { Providers } from "../../../components/Providers"
import { ModalWrapper } from "../../../components/ModalWrapper"

const MUTATED_RAW_DATA = "Bye"
const ERROR_MESSAGE = "Something happened"

test("Upload a file", async () => {
  const file = new File(["Hello, Hello, Hello, Hello"], "test.csv", { type: "text/csv" })

  const onContinue = jest.fn()
  render(
    <Providers theme={defaultTheme} rsiValues={mockRsiValues}>
      <ModalWrapper isOpen={true} onClose={() => {}}>
        <UploadStep onContinue={onContinue} />
      </ModalWrapper>
    </Providers>,
  )

  const uploader = screen.getByTestId("rsi-dropzone")
  fireEvent.drop(uploader, {
    target: { files: [file] },
  })
  await waitFor(
    () => {
      expect(onContinue).toBeCalled()
    },
    { timeout: 5000 },
  )
})

test("Should call uploadStepHook on file upload", async () => {
  const file = new File(["Hello, Hello, Hello, Hello"], "test.csv", { type: "text/csv" })
  const uploadStepHook = jest.fn(async (values) => {
    return values
  })
  render(<ReactSpreadsheetImport {...mockRsiValues} uploadStepHook={uploadStepHook} />)
  const uploader = screen.getByTestId("rsi-dropzone")
  fireEvent.drop(uploader, {
    target: { files: [file] },
  })

  await waitFor(
    () => {
      expect(uploadStepHook).toBeCalled()
    },
    { timeout: 5000 },
  )
})

test("uploadStepHook should be able to mutate raw upload data", async () => {
  const file = new File(["Hello, Hello, Hello, Hello"], "test.csv", { type: "text/csv" })
  const uploadStepHook = jest.fn(async ([[, ...values]]) => {
    return [[MUTATED_RAW_DATA, ...values]]
  })
  render(<ReactSpreadsheetImport {...mockRsiValues} uploadStepHook={uploadStepHook} />)

  const uploader = screen.getByTestId("rsi-dropzone")
  fireEvent.drop(uploader, {
    target: { files: [file] },
  })

  const el = await screen.findByText(MUTATED_RAW_DATA, undefined, { timeout: 5000 })
  expect(el).toBeInTheDocument()
})

test("Should show error toast if error is thrown in uploadStepHook", async () => {
  const file = new File(["Hello, Hello, Hello, Hello"], "test.csv", { type: "text/csv" })
  const uploadStepHook = jest.fn(async () => {
    throw new Error(ERROR_MESSAGE)
    return undefined as any
  })
  render(<ReactSpreadsheetImport {...mockRsiValues} uploadStepHook={uploadStepHook} />)

  const uploader = screen.getByTestId("rsi-dropzone")
  fireEvent.drop(uploader, {
    target: { files: [file] },
  })

  const errorToast = await screen.findByText(ERROR_MESSAGE, undefined, { timeout: 5000 })
  expect(errorToast).toBeInTheDocument()
})
