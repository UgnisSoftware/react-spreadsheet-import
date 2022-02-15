import { ReactSpreadsheetImport } from "../components/ReactSpreadsheetImport"
import { Button, useDisclosure } from "@chakra-ui/react"
export default {
  title: "React spreadsheet import",
}

export const Basic = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Open modal</Button>
      <ReactSpreadsheetImport isOpen={isOpen} onClose={onClose} config={{ title: "Upload file" }} />
    </>
  )
}
