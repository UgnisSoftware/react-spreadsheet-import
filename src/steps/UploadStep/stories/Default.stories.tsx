import { ReactSpreadsheetImport } from "../../../ReactSpreadsheetImport"
import { Button, useDisclosure } from "@chakra-ui/react"
import { mockRsiValues } from "../../../stories/mockRsiValues"

export default {
  title: "React spreadsheet import",
}

export const Basic = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Open modal</Button>
      <ReactSpreadsheetImport {...mockRsiValues} isOpen={isOpen} onClose={onClose} title="Upload file" />
    </>
  )
}
