import { editableTableInitialData, mockRsiValues } from "@/stories/mockRsiValues"
import { Providers } from "@/components/ui/Providers"
import { ModalWrapper } from "@/components/ModalWrapper"
import { ValidationStep } from "@/steps/ValidationStep/ValidationStep"
import { addErrorsAndRunHooks } from "@/steps/ValidationStep/utils/dataMutations"
import { useEffect, useState } from "react"
import { Data } from "@/types"
import { Meta } from "../types"

export default {
  title: "Validation Step",
  parameters: {
    layout: "fullscreen",
  },
}

const file = new File([""], "file.csv")

export const Basic = () => {
  const [data, setData] = useState<(Data<string> & Meta)[]>()

  useEffect(() => {
    addErrorsAndRunHooks(editableTableInitialData, mockRsiValues.fields)
      .then((result) => setData(result))
      .catch((error) => console.error("Error setting data:", error))
  }, [])

  if (!data) {
    return <div>Loading...</div>
  }

  console.log("Data:", data)

  return (
    <Providers rsiValues={mockRsiValues}>
      <ModalWrapper isOpen={true} onClose={() => {}}>
        <ValidationStep initialData={data} file={file} />
      </ModalWrapper>
    </Providers>
  )
}
