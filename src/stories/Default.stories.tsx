import { ReactSpreadsheetImport } from "../components/ReactSpreadsheetImport"
import { Button, useDisclosure } from "@chakra-ui/react"
import { mockRsiValues } from "./mockRsiValues"

export default {
  title: "React spreadsheet import",
}

export const Basic = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Open modal</Button>
      <ReactSpreadsheetImport {...mockRsiValues} isOpen={isOpen} onClose={onClose} config={{ title: "Upload file" }} />
    </>
  )
}
