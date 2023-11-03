import { UploadFlow } from "./UploadFlow"
import { ModalHeader } from "@chakra-ui/react"
import { useSteps, Step, Steps as Stepper } from "chakra-ui-steps"
import { CgCheck } from "react-icons/cg"
import { useRsi } from "../hooks/useRsi.js"
import { useRsiInitialStep } from "../hooks/useRsiInitialStep.js"

const CheckIcon = ({ color }: { color: string }) => <CgCheck size="2.25rem" color={color} />

export const Steps = () => {
  const { initialStepState, translations } = useRsi()

  const { steps, initialStep } = useRsiInitialStep(initialStepState?.type)

  const { nextStep, activeStep } = useSteps({
    initialStep,
  })

  return (
    <>
      <ModalHeader display={["none", "none", "block"]}>
        <Stepper activeStep={activeStep} checkIcon={CheckIcon}>
          {steps.map((key) => (
            <Step label={translations[key].title} key={key} />
          ))}
        </Stepper>
      </ModalHeader>
      <UploadFlow nextStep={nextStep} />
    </>
  )
}
