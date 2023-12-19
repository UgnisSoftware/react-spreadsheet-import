import { StepState, StepType, UploadFlow } from "./UploadFlow"
import { ModalHeader } from "@chakra-ui/react"
import { useSteps, Step, Steps as Stepper } from "chakra-ui-steps"
import { CgCheck } from "react-icons/cg"

import { useRsi } from "../hooks/useRsi"
import { useRef, useState } from "react"
import { steps, stepTypeToStepIndex, stepIndexToStepType } from "../utils/steps"

const CheckIcon = ({ color }: { color: string }) => <CgCheck size="36px" color={color} />

export const Steps = () => {
  const { initialStepState, translations, isNavigationEnabled } = useRsi()

  const initialStep = stepTypeToStepIndex(initialStepState?.type)

  const { nextStep, activeStep, setStep } = useSteps({
    initialStep,
  })

  const [state, setState] = useState<StepState>(initialStepState || { type: StepType.upload })

  const history = useRef<StepState[]>([])

  const onClickStep = (stepIndex: number) => {
    const type = stepIndexToStepType(stepIndex)
    const historyIdx = history.current.findIndex((v) => v.type === type)
    if (historyIdx === -1) return
    const nextHistory = history.current.slice(0, historyIdx + 1)
    history.current = nextHistory
    setState(nextHistory[nextHistory.length - 1])
    setStep(stepIndex)
  }

  const onBack = () => {
    onClickStep(Math.max(activeStep - 1, 0))
  }

  const onNext = (v: StepState) => {
    history.current.push(state)
    setState(v)
    v.type !== StepType.selectSheet && nextStep()
  }

  return (
    <>
      <ModalHeader display={["none", "none", "block"]}>
        <Stepper
          activeStep={activeStep}
          checkIcon={CheckIcon}
          onClickStep={isNavigationEnabled ? onClickStep : undefined}
          responsive={false}
        >
          {steps.map((key) => (
            <Step label={translations[key].title} key={key} />
          ))}
        </Stepper>
      </ModalHeader>
      <UploadFlow state={state} onNext={onNext} onBack={isNavigationEnabled ? onBack : undefined} />
    </>
  )
}
