import type XLSX from "xlsx"
import { Box, Heading, Text } from "@chakra-ui/react"
import { DropZone } from "./components/DropZone"
import { useRsi } from "../../hooks/useRsi"

const DEFAULT_TITLE = "Upload Sheet"
const MANIFEST_TITLE = "Data that we expect:"
const MANIFEST_DESCRIPTION = "(You will have a chance to select and rename columns in next steps)"

type UploadProps = {
  onContinue: (data: XLSX.WorkBook) => void
}

export const UploadStep = ({ onContinue }: UploadProps) => {
  const { title } = useRsi()
  return (
    <Box minH="fit-content" display="flex" flex={1} p="2rem" flexDirection="column">
      <Heading size="lg" color="gray.700" mb="2rem">
        {title || DEFAULT_TITLE}
      </Heading>
      <Text fontSize="2xl" lineHeight={8} fontWeight="semibold" color="gray.700">
        {MANIFEST_TITLE}
      </Text>
      <Text fontSize="md" lineHeight={6} color="gray.500" mb="2rem">
        {MANIFEST_DESCRIPTION}
      </Text>
      <DropZone onContinue={onContinue} />
    </Box>
  )
}
