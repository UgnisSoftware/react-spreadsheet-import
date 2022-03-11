import React, { useCallback, useState } from "react"
import { Heading, ModalBody } from "@chakra-ui/react"
import { SelectHeaderTable } from "./components/SelectHeaderTable"
import { ContinueButton } from "../../components/ContinueButton"
import { useRsi } from "../../hooks/useRsi"

type SelectHeaderProps = {
  data: string[][]
  onContinue: (headerValues: string[], data: string[][]) => void
}

export const SelectHeaderStep = ({ data, onContinue }: SelectHeaderProps) => {
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
        <Heading size="lg" color="gray.700" mb="2rem">
          {translations.selectHeaderStep.title}
        </Heading>
        <SelectHeaderTable data={data} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
      </ModalBody>
      <ContinueButton onContinue={handleContinue} title={translations.selectHeaderStep.nextButtonTitle} />
    </>
  )
}
