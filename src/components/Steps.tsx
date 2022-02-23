import { UploadFlow } from "./UploadFlow"
import { Box } from "@chakra-ui/react"
import { useSteps, Step, Steps as Stepper } from "chakra-ui-steps"
import { CgCheck } from "react-icons/cg"
import { dataAttr } from "@chakra-ui/utils"

const steps = [
  { label: "Upload file" },
  { label: "Select header row" },
  { label: "Match columns" },
  { label: "Validate data" },
]

const CheckIcon = ({ color }: { color: string }) => <CgCheck size="2.25rem" color={color} />

export const Steps = () => {
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  })

  return (
    <Box display="flex" flexDirection="column" flex={1} overflow="auto">
      <Box bg="gray.100" px="2rem" py="1.5rem">
        <Stepper activeStep={activeStep} checkIcon={CheckIcon}>
          {steps.map(({ label }) => (
            <Step label={label} key={label} />
          ))}
        </Stepper>
      </Box>
      <UploadFlow nextStep={nextStep} />
    </Box>
  )
}
