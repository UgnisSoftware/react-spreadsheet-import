import React, { useCallback, useState } from "react"
import { Heading, ModalBody, useStyleConfig } from "@chakra-ui/react"
import { SelectHeaderTable } from "./components/SelectHeaderTable"
import { ContinueButton } from "../../components/ContinueButton"
import { useRsi } from "../../hooks/useRsi"
import type { themeOverrides } from "../../theme"

type SelectHeaderProps = {
  data: string[][]
  onContinue: (headerValues: string[], data: string[][]) => void
}

export const SelectHeaderStep = ({ data, onContinue }: SelectHeaderProps) => {
  const styles = useStyleConfig(
    "SelectHeaderStep",
  ) as typeof themeOverrides["components"]["SelectHeaderStep"]["baseStyle"]
  const { translations } = useRsi()
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(new Set([0]))

  const handleContinue = useCallback(() => {
    const [selectedRowIndex] = selectedRows
    // We consider data above header to be redundant
    const trimmedData = data.slice(selectedRowIndex + 1)
    onContinue(data[selectedRowIndex], trimmedData)
  }, [onContinue, data, selectedRows])

  return (
    <>
      <ModalBody pb={0}>
        <Heading {...styles.heading}>{translations.selectHeaderStep.title}</Heading>
        <SelectHeaderTable data={data} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
      </ModalBody>
      <ContinueButton onContinue={handleContinue} title={translations.selectHeaderStep.nextButtonTitle} />
    </>
  )
}
