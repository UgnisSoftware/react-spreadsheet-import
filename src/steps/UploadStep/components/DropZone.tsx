import { Button, FileUpload, Text, useFileUpload, useSlotRecipe } from "@chakra-ui/react"
import * as XLSX from "xlsx-ugnis"
import { useState } from "react"
import { useRSIContext } from "@/contexts/RSIContext"
import { readFileAsync } from "@/steps/UploadStep/utils/readFilesAsync"
import { toaster } from "@/components/ui/toaster"

type DropZoneProps = {
  onContinue: (data: XLSX.WorkBook, file: File) => void
  isLoading: boolean
}

export const DropZone = ({ onContinue, isLoading }: DropZoneProps) => {
  const { translations, maxFileSize, dateFormat, parseRaw } = useRSIContext()

  const recipe = useSlotRecipe({ key: "uploadStep" })
  const styles = recipe()

  const [loading, setLoading] = useState(false)

  const fileUpload = useFileUpload({
    accept: acceptedFileTypes,
    maxFileSize,
    maxFiles: 1,
    onFileAccept: async ({ files }) => {
      const file = files[0]
      setLoading(true)
      const arrayBuffer = await readFileAsync(file)
      const workbook = XLSX.read(arrayBuffer, {
        cellDates: true,
        dateNF: dateFormat,
        raw: parseRaw,
        dense: true,
        codepage: 65001,
      })
      setLoading(false)
      onContinue(workbook, file)
    },
    onFileReject: ({ files }) => {
      setLoading(false)
      files.forEach((fileRejection) => {
        toaster.create({
          type: "error",
          title: `${fileRejection.file.name} ${translations.uploadStep.dropzone.errorToastDescription}`,
          // TODO: use a more specific error message based on the fileRejection.errors
          description: fileRejection.errors[0],
          closable: true,
        })
      })
    },
  })

  return (
    <FileUpload.RootProvider css={styles.dropZoneBorder} alignItems="stretch" flex={1} value={fileUpload}>
      <FileUpload.HiddenInput data-testid="rsi-dropzone" />
      <FileUpload.Dropzone flex={1}>
        <FileUpload.DropzoneContent>
          {fileUpload.dragging ? (
            <Text css={styles.dropzoneText}>{translations.uploadStep.dropzone.activeDropzoneTitle}</Text>
          ) : loading || isLoading ? (
            <Text css={styles.dropzoneText}>{translations.uploadStep.dropzone.loadingTitle}</Text>
          ) : (
            <>
              <Text css={styles.dropzoneText}>{translations.uploadStep.dropzone.title}</Text>
              <Button css={styles.dropzoneButton}>{translations.uploadStep.dropzone.buttonTitle}</Button>
            </>
          )}
        </FileUpload.DropzoneContent>
      </FileUpload.Dropzone>
      <FileUpload.List />
    </FileUpload.RootProvider>
  )
}

const acceptedFileTypes = {
  "application/vnd.ms-excel": [".xls"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
  "text/csv": [".csv"],
}
