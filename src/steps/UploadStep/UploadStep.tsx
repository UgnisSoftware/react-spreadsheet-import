import type XLSX from "xlsx"
import { Box, Heading, ModalBody, Text, useStyleConfig } from "@chakra-ui/react"
import { DropZone } from "./components/DropZone"
import { useRsi } from "../../hooks/useRsi"
import { ExampleTable } from "./components/ExampleTable"
import React from "react"
import { FadingOverlay } from "./components/FadingOverlay"
import { variant } from "styled-system"

type UploadProps = {
  onContinue: (data: XLSX.WorkBook) => void
}

export const UploadStep = (props: UploadProps) => {
  const styles = useStyleConfig("UploadStep") as any
  const { translations, fields } = useRsi()
  return (
    <ModalBody>
      <Heading sx={styles.heading}>{translations.uploadStep.title}</Heading>
      <Text sx={styles.title}>{translations.uploadStep.manifestTitle}</Text>
      <Text sx={styles.subtitle}>{translations.uploadStep.manifestDescription}</Text>
      <Box mb="0.5rem" position="relative">
        <ExampleTable fields={fields} />
        <FadingOverlay />
      </Box>
      <DropZone onContinue={props.onContinue} />
    </ModalBody>
  )
}
