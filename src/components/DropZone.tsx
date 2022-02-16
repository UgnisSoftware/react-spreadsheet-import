import { Box, Button, Text, useTheme, useToast } from "@chakra-ui/react"
import { getDropZoneBorder } from "../utils/getDropZoneBorder"
import { useDropzone } from "react-dropzone"
import XLSX from "xlsx"

const UPLOAD_TITLE = "Upload .xlsx, .xls or .csv file"
const ERROR_TOAST_DESCRIPTION = "upload rejected"
const ACTIVE_DROP_ZONE_TITLE = "Drop file here..."
const BUTTON_TITLE = "Select file"

type DropZoneProps = {
  onContinue: (data: XLSX.WorkBook) => void
  onMultiSheetContinue: (data: XLSX.WorkBook) => void
}

export const DropZone = ({ onContinue, onMultiSheetContinue }: DropZoneProps) => {
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
      if (workbook.SheetNames.length === 1) {
        onContinue(workbook)
      } else {
        onMultiSheetContinue(workbook)
      }
    },
  })
  return (
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
      flex={1}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <Text size="lg" lineHeight={7} fontWeight="semibold">
          {ACTIVE_DROP_ZONE_TITLE}
        </Text>
      ) : (
        <>
          <Text fontSize="lg" lineHeight={7} fontWeight="semibold">
            {UPLOAD_TITLE}
          </Text>
          <Button mt="1rem">{BUTTON_TITLE}</Button>
        </>
      )}
    </Box>
  )
}
