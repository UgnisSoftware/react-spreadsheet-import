import { useRef, useState } from "react"
import { Steps as ChakraSteps, Dialog, useSteps } from "@chakra-ui/react"
import { useRSIContext } from "@/contexts/RSIContext"
import { stepIndexToStepType, stepTypeToStepIndex, steps } from "@/utils/steps"
import { type StepState, StepType } from "./types"
import { UploadFlow } from "@/steps/UploadFlow"

export const Steps = () => {
  const { initialStepState, translations, isNavigationEnabled } = useRSIContext()

  const stepsHook = useSteps({
    defaultStep: stepTypeToStepIndex(initialStepState?.type),
    count: steps.length,
  })

  const [state, setState] = useState<StepState>(initialStepState || { type: StepType.upload })

  const activeStep = stepTypeToStepIndex(state.type)

  const history = useRef<StepState[]>([])

  const onClickStep = (stepIndex: number) => {
    const type = stepIndexToStepType(stepIndex)
    const historyIdx = history.current.findIndex((v) => v.type === type)
    if (historyIdx === -1) return
    const nextHistory = history.current.slice(0, historyIdx + 1)
    history.current = nextHistory
    setState(nextHistory[nextHistory.length - 1])
  }

  const onBack = () => {
    onClickStep(Math.max(activeStep - 1, 0))
  }

  const onNext = (v: StepState) => {
    history.current.push(state)
    setState(v)
    if (v.type !== StepType.selectSheet) {
      stepsHook.goToNextStep()
    }
  }

  return (
    <>
      <Dialog.Header display={["none", "none", "block"]}>
        <ChakraSteps.Root step={activeStep} count={steps.length} variant="rsi">
          <ChakraSteps.List>
            {steps.map((step, index) => (
              <ChakraSteps.Item key={step} index={index} title={translations[step].title}>
                <ChakraSteps.Trigger disabled={!isNavigationEnabled}>
                  <ChakraSteps.Indicator />
                  <ChakraSteps.Title>{translations[step].title}</ChakraSteps.Title>
                </ChakraSteps.Trigger>
                <ChakraSteps.Separator />
              </ChakraSteps.Item>
            ))}
          </ChakraSteps.List>
        </ChakraSteps.Root>
      </Dialog.Header>
      <UploadFlow state={state} onNext={onNext} onBack={isNavigationEnabled ? onBack : undefined} />
    </>
  )
}
