import { Box, Button, Text, useStyleConfig, useToast } from "@chakra-ui/react"
import { useDropzone } from "react-dropzone"
import * as XLSX from "xlsx"
import { useState } from "react"
import { getDropZoneBorder } from "../utils/getDropZoneBorder"
import { useRsi } from "../../../hooks/useRsi"
import { readFileAsync } from "../utils/readFilesAsync"
import type { themeOverrides } from "../../../theme"
import { toast } from "react-toastify"

type DropZoneProps = {
  onContinue: (data: XLSX.WorkBook) => void
  isLoading: boolean
}

export const DropZone = ({ onContinue, isLoading }: DropZoneProps) => {
  const { translations, maxFileSize, dateFormat, parseRaw } = useRsi()
  const styles = useStyleConfig("UploadStep") as typeof themeOverrides["components"]["UploadStep"]["baseStyle"]
  const [loading, setLoading] = useState(false)
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    maxSize: maxFileSize,
    accept: ".xls, .csv, .xlsx",
    onDropRejected: (fileRejections) => {
      setLoading(false)
      fileRejections.forEach((fileRejection) => {
        toast.error(fileRejection.errors[0].message)
      })
    },
    onDrop: async ([file]) => {
      setLoading(true)
      const arrayBuffer = await readFileAsync(file)
      const workbook = XLSX.read(arrayBuffer, { cellDates: true, dateNF: dateFormat, raw: parseRaw })
      setLoading(false)
      onContinue(workbook)
    },
  })

  return (
    <Box
      {...getRootProps()}
      {...getDropZoneBorder(styles.dropZoneBorder)}
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      flex={1}
      className={"file-uploader"}
    >
      <input {...getInputProps()} data-testid="rsi-dropzone" />
      {isDragActive ? (
        <Text sx={styles.dropzoneText}>{translations.uploadStep.dropzone.activeDropzoneTitle}</Text>
      ) : loading || isLoading ? (
        <Text sx={styles.dropzoneText}>{translations.uploadStep.dropzone.loadingTitle}</Text>
      ) : (
        <>
          <Text sx={styles.dropzoneText}>{translations.uploadStep.dropzone.title}</Text>
          <Button sx={styles.dropzoneButton} onClick={open}>
            {translations.uploadStep.dropzone.buttonTitle}
          </Button>
        </>
      )}
    </Box>
  )
}
