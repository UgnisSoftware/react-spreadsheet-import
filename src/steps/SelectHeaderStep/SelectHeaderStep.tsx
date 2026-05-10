import { useCallback, useState } from "react"
import { Heading, Dialog } from "@chakra-ui/react"
import type { RawData } from "@/types"
import { useRSIContext } from "@/contexts/RSIContext"
import { SelectHeaderTable } from "@/steps/SelectHeaderStep/components/SelectHeaderTable"
import { ContinueButton } from "@/components/ContinueButton"

type SelectHeaderProps = {
  data: RawData[]
  onContinue: (headerValues: RawData, data: RawData[]) => Promise<void>
  onBack?: () => void
}

export const SelectHeaderStep = ({ data, onContinue, onBack }: SelectHeaderProps) => {
  const { translations } = useRSIContext()
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(new Set([0]))
  const [isLoading, setIsLoading] = useState(false)

  const handleContinue = useCallback(async () => {
    const [selectedRowIndex] = Array.from(selectedRows)
    // We consider data above header to be redundant
    const trimmedData = data.slice(selectedRowIndex + 1)
    setIsLoading(true)
    await onContinue(data[selectedRowIndex], trimmedData)
    setIsLoading(false)
  }, [onContinue, data, selectedRows])

  return (
    <>
      <Dialog.Body pb={0}>
        <Heading variant="rsi">{translations.selectHeaderStep.title}</Heading>
        <SelectHeaderTable data={data} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
      </Dialog.Body>
      <ContinueButton
        onContinue={handleContinue}
        onBack={onBack}
        title={translations.selectHeaderStep.nextButtonTitle}
        backTitle={translations.selectHeaderStep.backButtonTitle}
        isLoading={isLoading}
      />
    </>
  )
}
