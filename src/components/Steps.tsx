import { UploadFlow } from "./UploadFlow"
import { Box } from "@chakra-ui/react"
import { useSteps, Step, Steps as Stepper } from "chakra-ui-steps"

const steps = [
  { label: "Upload file" },
  { label: "Select header row" },
  { label: "Match columns" },
  { label: "Validate data" },
]

export const Steps = () => {
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  })

  return (
    <Box display="flex" flexDirection="column" flex={1} overflow="auto">
      <Box bg="gray.100" px="2rem" py="1.5rem">
        <Stepper activeStep={activeStep}>
          {steps.map(({ label }) => (
            <Step label={label} key={label} />
          ))}
        </Stepper>
      </Box>
      <UploadFlow nextStep={nextStep} />
    </Box>
  )
}
