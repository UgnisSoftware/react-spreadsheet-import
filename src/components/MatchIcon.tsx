import { chakra, useStyleConfig, Flex } from "@chakra-ui/react"
import { dataAttr } from "@chakra-ui/utils"
import { motion } from "framer-motion"
import { CheckIcon } from "./CheckIcon"

const MotionFlex = motion(Flex)

const animationConfig = {
  transition: {
    duration: 0.1,
  },
  exit: { scale: 0.5, opacity: 0 },
  initial: { scale: 0.5, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
}
type MatchIconProps = {
  isChecked: boolean
}

export const MatchIcon = (props: MatchIconProps) => {
  const style = useStyleConfig("MatchIcon", props)
  return (
    <chakra.div __css={style} minW={6} minH={6} w={6} h={6} data-highlighted={dataAttr(props.isChecked)} ml={'0.875rem'} mr={3}>
      {props.isChecked && (
        <MotionFlex {...animationConfig}>
          <CheckIcon width={3} height={3} />
        </MotionFlex>
      )}
    </chakra.div>
  )
}
