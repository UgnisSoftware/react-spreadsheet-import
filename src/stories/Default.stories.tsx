import { ReactSpreadsheetImport } from "../ReactSpreadsheetImport"
import { Box, Link, Code, Button, useDisclosure } from "@chakra-ui/react"
import { mockRsiValues } from "./mockRsiValues"
import { useState } from "react"

export default {
  title: "React spreadsheet import",
}

export const Basic = () => {
  const [data, setData] = useState<any>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Box py={20} display="flex" gap="8px" alignItems="center">
        <Button onClick={onOpen} border="2px solid #7069FA" p="8px" borderRadius="8px">
          Open Flow
        </Button>
        (make sure you have a file to upload)
      </Box>
      <Link href="./exampleFile.csv" border="2px solid #718096" p="8px" borderRadius="8px" download="exampleCSV">
        Download example file
      </Link>
      <ReactSpreadsheetImport
        {...mockRsiValues}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={async (data, file) => {
          const form = new FormData()
          form.append("file", file, file.name)
          await fetch("http://localhost:3000/upload", {
            method: "POST",
            body: form,
            // Disabling CORS because frontend and backend runs on different ports, should not be needed in production
            mode: "no-cors",
          })
          setData(data)
        }}
      />
      {data && (
        <Box pt={64} display="flex" gap="8px" flexDirection="column">
          <b>Returned data:</b>
          <Code
            display="flex"
            alignItems="center"
            borderRadius="16px"
            fontSize="12px"
            background="#4A5568"
            color="white"
            p={32}
          >
            <pre>{JSON.stringify(data, undefined, 4)}</pre>
          </Code>
        </Box>
      )}
    </>
  )
}
