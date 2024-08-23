import { StepType } from "../steps/UploadFlow"

export const steps = ["uploadStep", "selectHeaderStep", "matchColumnsStep", "validationStep"] as const
const StepTypeToStepRecord: Record<StepType, (typeof steps)[number]> = {
  [StepType.upload]: "uploadStep",
  [StepType.selectSheet]: "uploadStep",
  [StepType.selectHeader]: "selectHeaderStep",
  [StepType.matchColumns]: "matchColumnsStep",
  [StepType.validateData]: "validationStep",
}
const StepToStepTypeRecord: Record<(typeof steps)[number], StepType> = {
  uploadStep: StepType.upload,
  selectHeaderStep: StepType.selectHeader,
  matchColumnsStep: StepType.matchColumns,
  validationStep: StepType.validateData,
}

export const stepIndexToStepType = (stepIndex: number) => {
  const step = steps[stepIndex]
  return StepToStepTypeRecord[step] || StepType.upload
}

export const stepTypeToStepIndex = (type?: StepType) => {
  const step = StepTypeToStepRecord[type || StepType.upload]
  return Math.max(0, steps.indexOf(step))
}
