import { ReactSpreadsheetImport } from "@/ReactSpreadsheetImport"
import { Box, Link, Code, Button } from "@chakra-ui/react"
import { mockRsiValues } from "./mockRsiValues"
import { useState } from "react"
import type { Result } from "@/types"

export default {
  title: "React spreadsheet import",
  parameters: {
    layout: "fullscreen",
  },
}

export const Basic = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<Result<any> | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Box paddingTop={100} />
      <Box py={20} display="flex" gap="8px" alignItems="center">
        <Button onClick={() => setIsOpen(true)} border="2px solid #7069FA" p="8px" borderRadius="8px">
          Open Flow
        </Button>
        (make sure you have a file to upload)
      </Box>
      <Link href="./exampleFile.csv" border="2px solid #718096" p="8px" borderRadius="8px" download="exampleCSV">
        Download example file
      </Link>
      {!!data && (
        <Box pt={64} display="flex" gap="8px" flexDirection="column">
          <b>Returned data (showing first 100 rows):</b>
          <Code
            display="flex"
            alignItems="center"
            borderRadius="16px"
            fontSize="12px"
            background="#4A5568"
            color="white"
            p={32}
          >
            <pre>
              {JSON.stringify(
                {
                  validData: data.validData.slice(0, 100),
                  invalidData: data.invalidData.slice(0, 100),
                  all: data.all.slice(0, 100),
                },
                undefined,
                4,
              )}
            </pre>
          </Code>
        </Box>
      )}
      <ReactSpreadsheetImport {...mockRsiValues} isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={setData} />
    </>
  )
}

Basic.parameters = {
  chromatic: { disableSnapshot: true },
}
