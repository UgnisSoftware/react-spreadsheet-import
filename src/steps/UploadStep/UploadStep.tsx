import type XLSX from "xlsx"
import { Box, Heading, ModalBody, Text } from "@chakra-ui/react"
import { DropZone } from "./components/DropZone"
import { useRsi } from "../../hooks/useRsi"
import { ExampleTable } from "./components/ExampleTable"
import React from "react"
import { FadingOverlay } from "./components/FadingOverlay"

const DEFAULT_TITLE = "Upload Sheet"
const MANIFEST_TITLE = "Data that we expect:"
const MANIFEST_DESCRIPTION = "(You will have a chance to rename or remove columns in next steps)"

type UploadProps = {
  onContinue: (data: XLSX.WorkBook) => void
}

export const UploadStep = ({ onContinue }: UploadProps) => {
  const { title, fields } = useRsi()
  return (
    <ModalBody>
      <Heading size="lg" color="gray.700" mb="2rem">
        {title || DEFAULT_TITLE}
      </Heading>
      <Text fontSize="2xl" lineHeight={8} fontWeight="semibold" color="gray.700">
        {MANIFEST_TITLE}
      </Text>
      <Text fontSize="md" lineHeight={6} color="gray.500" mb="1rem">
        {MANIFEST_DESCRIPTION}
      </Text>
      <Box mb="0.5rem" position="relative">
        <ExampleTable fields={fields} />
        <FadingOverlay />
      </Box>
      <DropZone onContinue={onContinue} />
    </ModalBody>
  )
}
