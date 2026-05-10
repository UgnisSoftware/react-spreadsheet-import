import { render, fireEvent, waitFor, screen } from "@/tests/test-utils"
import { UploadStep } from "../UploadStep"
import { ReactSpreadsheetImport } from "@/ReactSpreadsheetImport"
import { mockRsiValues } from "@/stories/mockRsiValues"
import { ModalWrapper } from "@/components/ModalWrapper"
import userEvent from "@testing-library/user-event"

const MUTATED_RAW_DATA = "Bye"
const ERROR_MESSAGE = "Something happened while uploading"

test("Upload a file", async () => {
  const file = new File(["Hello, Hello, Hello, Hello"], "test.csv", { type: "text/csv" })

  const onContinue = vi.fn()
  render(
    <ModalWrapper isOpen={true} onClose={() => {}}>
      <UploadStep onContinue={onContinue} />
    </ModalWrapper>,
  )

  const uploader = screen.getByTestId("rsi-dropzone")
  await userEvent.upload(uploader, file)
  await waitFor(
    () => {
      expect(onContinue).toBeCalled()
    },
    { timeout: 5000 },
  )
})

test("Should call uploadStepHook on file upload", async () => {
  const file = new File(["Hello, Hello, Hello, Hello"], "test.csv", { type: "text/csv" })
  const uploadStepHook = vi.fn(async (values) => {
    return values
  })
  render(<ReactSpreadsheetImport {...mockRsiValues} uploadStepHook={uploadStepHook} />)
  const uploader = screen.getByTestId("rsi-dropzone")
  await userEvent.upload(uploader, file)

  await waitFor(
    () => {
      expect(uploadStepHook).toBeCalled()
    },
    { timeout: 5000 },
  )
})

test("uploadStepHook should be able to mutate raw upload data", async () => {
  const file = new File(["Hello, Hello, Hello, Hello"], "test.csv", { type: "text/csv" })
  const uploadStepHook = vi.fn(async ([[, ...values]]) => {
    return [[MUTATED_RAW_DATA, ...values]]
  })
  render(<ReactSpreadsheetImport {...mockRsiValues} uploadStepHook={uploadStepHook} />)

  const uploader = screen.getByTestId("rsi-dropzone")
  await userEvent.upload(uploader, file)

  const el = await screen.findByText(MUTATED_RAW_DATA, undefined, { timeout: 5000 })
  expect(el).toBeInTheDocument()
})

test("Should show error toast if error is thrown in uploadStepHook", async () => {
  const file = new File(["Hello, Hello, Hello, Hello"], "test.csv", { type: "text/csv" })
  const uploadStepHook = vi.fn(async () => {
    throw new Error(ERROR_MESSAGE)
  })
  render(<ReactSpreadsheetImport {...mockRsiValues} uploadStepHook={uploadStepHook} />)

  const uploader = screen.getByTestId("rsi-dropzone")
  await userEvent.upload(uploader, file)

  const errorToast = await screen.findAllByText(ERROR_MESSAGE, undefined, { timeout: 5000 })
  expect(errorToast?.[0]).toBeInTheDocument()
})
