import { useCallback, useState } from "react"
import { Heading, ModalBody, useStyleConfig, Box } from "@chakra-ui/react"
import { SelectHeaderTable } from "./components/SelectHeaderTable"
import { ContinueButton } from "../../components/ContinueButton"
import { useRsi } from "../../hooks/useRsi"
import type { themeOverrides } from "../../theme"
import type { RawData } from "../../types"

type SelectHeaderProps = {
  data: RawData[]
  onContinue: (headerValues: RawData, data: RawData[]) => Promise<void>
}

export const SelectHeaderStep = ({ data, onContinue }: SelectHeaderProps) => {
  const styles = useStyleConfig(
    "SelectHeaderStep",
  ) as typeof themeOverrides["components"]["SelectHeaderStep"]["baseStyle"]
  const { translations } = useRsi()
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(new Set([0]))
  const [isLoading, setIsLoading] = useState(false)

  const handleContinue = useCallback(async () => {
    const [selectedRowIndex] = selectedRows
    // We consider data above header to be redundant
    const trimmedData = data.slice(selectedRowIndex + 1)
    setIsLoading(true)
    await onContinue(data[selectedRowIndex], trimmedData)
    setIsLoading(false)
  }, [onContinue, data, selectedRows])

  return (
    <>
      <ModalBody pb={0}>
        <Heading {...styles.heading}>{translations.selectHeaderStep.title}</Heading>
        <Box h={0} flexGrow={1}>
          <SelectHeaderTable data={data} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
        </Box>
      </ModalBody>
      <ContinueButton
        onContinue={handleContinue}
        title={translations.selectHeaderStep.nextButtonTitle}
        isLoading={isLoading}
      />
    </>
  )
}
