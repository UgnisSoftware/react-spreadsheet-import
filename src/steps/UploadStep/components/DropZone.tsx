import { Box, Button, Text, useTheme, useToast } from "@chakra-ui/react"
import { useDropzone } from "react-dropzone"
import * as XLSX from "xlsx"
import { useState } from "react"
import { getDropZoneBorder } from "../utils/getDropZoneBorder"
import { useRsi } from "../../../hooks/useRsi"

type DropZoneProps = {
  onContinue: (data: XLSX.WorkBook) => void
}

export const DropZone = ({ onContinue }: DropZoneProps) => {
  const { translations } = useRsi()
  const {
    colors: { rsi },
  } = useTheme()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    accept: ".xls, .csv, .xlsx",
    onDropRejected: (fileRejections) => {
      setLoading(false)
      fileRejections.forEach((fileRejection) => {
        toast({
          status: "error",
          title: `${fileRejection.file.name} ${translations.uploadStep.dropzone.errorToastDescription}`,
          description: fileRejection.errors[0].message,
        })
      })
    },
    onDrop: async ([file]) => {
      setLoading(true)
      const arrayBuffer = await file.arrayBuffer()
      const workbook = XLSX.read(arrayBuffer)
      onContinue(workbook)
    },
  })

  return (
    <Box
      {...getRootProps()}
      {...getDropZoneBorder(rsi["500"])}
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      flex={1}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <Text size="lg" lineHeight={7} fontWeight="semibold">
          {translations.uploadStep.dropzone.activeDropzoneTitle}
        </Text>
      ) : loading ? (
        <Text size="lg" lineHeight={7} fontWeight="semibold">
          {translations.uploadStep.dropzone.loadingTitle}
        </Text>
      ) : (
        <>
          <Text fontSize="lg" lineHeight={7} fontWeight="semibold">
            {translations.uploadStep.dropzone.title}
          </Text>
          <Button mt="1rem" onClick={open}>
            {translations.uploadStep.dropzone.buttonTitle}
          </Button>
        </>
      )}
    </Box>
  )
}
