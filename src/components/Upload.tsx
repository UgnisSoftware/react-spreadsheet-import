import XLSX from "xlsx"
import { useDropzone } from "react-dropzone"
import { Box, Text, useToast } from "@chakra-ui/react"

const UPLOAD_TITLE = "Drop XLS or CSV file here"
const DESCRIPTION_1 = "Or "
const DESCRIPTION_2 = "click "
const DESCRIPTION_3 = "to upload"
const ERROR_TOAST_DESCRIPTION = "upload rejected"
const ACTIVE_DROP_ZONE_TITLE = "Drop file here..."

type UploadProps = {
  onContinue: (data: string[][]) => void
}

export const Upload = ({ onContinue }: UploadProps) => {
  const toast = useToast()
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    accept: ".xls, .csv, .xlsx",
    onDropRejected: (fileRejections) => {
      fileRejections.forEach((fileRejection) => {
        toast({
          status: "error",
          title: `${fileRejection.file.name} ${ERROR_TOAST_DESCRIPTION}`,
          description: fileRejection.errors[0].message,
        })
      })
    },
    onDrop: async ([file]) => {
      const arrayBuffer = await file.arrayBuffer()
      const workbook = XLSX.read(arrayBuffer)
      const first_worksheet = workbook.Sheets[workbook.SheetNames[0]]
      const data = XLSX.utils.sheet_to_json(first_worksheet, {
        header: 1,
        blankrows: false,
      })
      onContinue(data as string[][])
    },
  })

  return (
    <Box minH="fit-content" display="flex" alignItems="center" justifyContent="center" {...getRootProps()}>
      {/*Box prevents child from resizing and corrupting svg*/}
      <Box flex={0.6}>
        <Box width="100%" cursor="pointer">
          <Box
            onClick={open}
            minH={"16.75rem"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            flexDir="column"
            py="6rem"
            px="2rem"
            bg="neutral.50"
            backgroundImage={
              "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%23BED0F7FF' stroke-width='5' stroke-dasharray='19' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e\");\n" +
              "border-radius: 12px;"
            }
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <Text variant="h5">{ACTIVE_DROP_ZONE_TITLE}</Text>
            ) : (
              <>
                <Text variant="h5">{UPLOAD_TITLE}</Text>
                <Box as="span" pt="1.25rem">
                  <Text display="inline">{DESCRIPTION_1}</Text>
                  <Text display="inline" color="accent.700">
                    {DESCRIPTION_2}
                  </Text>
                  <Text display="inline">{DESCRIPTION_3}</Text>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
