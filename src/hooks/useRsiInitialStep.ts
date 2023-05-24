import { useCallback } from "react"
import { StepType } from "../steps/UploadFlow"

export const useRsiInitialStep = (step: StepType) => {
  const steps = ["uploadStep", "selectHeaderStep", "matchColumnsStep", "validationStep"] as const

  const getInitialStep = useCallback((step: StepType) => {
    switch (step) {
      case StepType.upload:
        return 0
      case StepType.selectSheet:
        return 0
      case StepType.selectHeader:
        return 1
      case StepType.matchColumns:
        return 2
      case StepType.validateData:
        return 3
      default:
        return 0
    }
  }, [])

  return { steps, initialStep: getInitialStep(step) }
}
