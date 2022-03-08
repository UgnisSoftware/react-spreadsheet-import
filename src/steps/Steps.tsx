import { UploadFlow } from "./UploadFlow"
import { ModalHeader } from "@chakra-ui/react"
import { useSteps, Step, Steps as Stepper } from "chakra-ui-steps"
import { CgCheck } from "react-icons/cg"
import { useRsi } from "../hooks/useRsi"

const CheckIcon = ({ color }: { color: string }) => <CgCheck size="2.25rem" color={color} />

export const Steps = () => {
  const { translations } = useRsi()
  const { nextStep, activeStep } = useSteps({
    initialStep: 0,
  })

  return (
    <>
      <ModalHeader>
        <Stepper activeStep={activeStep} checkIcon={CheckIcon}>
          {Object.values(translations).map(({ title }) => (
            <Step label={title} key={title} />
          ))}
        </Stepper>
      </ModalHeader>
      <UploadFlow nextStep={nextStep} />
    </>
  )
}
