import XLSX from "xlsx"
import { useDropzone } from "react-dropzone"
import { Box, Button, Text, useTheme, useToast } from "@chakra-ui/react"
import { getDropZoneBorder } from "../utils/getDropZoneBorder"

const UPLOAD_TITLE = "Upload .xlsx, .xls or .csv file"
const ERROR_TOAST_DESCRIPTION = "upload rejected"
const ACTIVE_DROP_ZONE_TITLE = "Drop file here..."
const BUTTON_TITLE = "Select file"

type UploadProps = {
  onContinue: (data: string[][]) => void
}

export const Upload = ({ onContinue }: UploadProps) => {
  const {
    colors: { rsi },
  } = useTheme()
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
    <Box minH="fit-content" display="flex" flex={1} p="2rem">
      <Box
        {...getRootProps()}
        {...getDropZoneBorder(rsi["500"])}
        width="100%"
        cursor="pointer"
        onClick={open}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Text size="lg" lineHeight={7} fontWeight="semibold">
            {ACTIVE_DROP_ZONE_TITLE}
          </Text>
        ) : (
          <>
            <Text size="lg" lineHeight={7} fontWeight="semibold">
              {UPLOAD_TITLE}
            </Text>
            <Button mt="1rem">{BUTTON_TITLE}</Button>
          </>
        )}
      </Box>
    </Box>
  )
}
