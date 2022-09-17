import { ReactSpreadsheetImport } from "../ReactSpreadsheetImport"
import { Box, Link, Code, Button, useDisclosure, ChakraProvider } from "@chakra-ui/react"
import { mockRsiValues } from "./mockRsiValues"
import { useState } from "react"
import { StepType } from "../steps/UploadFlow"

export default {
  title: "React spreadsheet import",
}

export const Basic = () => {
  const [data, setData] = useState<any>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <ChakraProvider>
      <Box py={6} display="flex" gap="8px" alignItems="center">
        <Button onClick={onOpen} border="2px solid #7069FA" p="8px" borderRadius="8px">
          Open Flow
        </Button>
        (make sure you have a file to upload)
      </Box>
      <Link href="./exampleFile.csv" border="2px solid #718096" p="8px" borderRadius="8px" download="exampleCSV">
        Download example file
      </Link>
      <ReactSpreadsheetImport {...mockRsiValues} isOpen={isOpen} onClose={onClose} onSubmit={setData} />
      {data && (
        <Box pt={8} display="flex" gap="8px" flexDirection="column">
          <b>Returned data:</b>
          <Code
            display="flex"
            alignItems="center"
            borderRadius="16px"
            fontSize="12px"
            background="#4A5568"
            color="white"
            p={6}
          >
            <pre>{JSON.stringify(data, undefined, 4)}</pre>
          </Code>
        </Box>
      )}
    </ChakraProvider>
  )
}
