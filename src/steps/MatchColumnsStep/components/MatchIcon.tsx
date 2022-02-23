import { chakra, useStyleConfig, Flex } from "@chakra-ui/react"
import { dataAttr } from "@chakra-ui/utils"
import { motion } from "framer-motion"
import { CgCheck } from "react-icons/cg"

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
  matched: boolean
}

export const MatchIcon = (props: MatchIconProps) => {
  const style = useStyleConfig("MatchIcon", props)
  return (
    <chakra.div
      __css={style}
      minW={6}
      minH={6}
      w={6}
      h={6}
      data-highlighted={dataAttr(props.matched)}
      ml={"0.875rem"}
      mr={3}
    >
      {props.matched && (
        <MotionFlex {...animationConfig}>
          <CgCheck size={"1.5rem"}/>
        </MotionFlex>
      )}
    </chakra.div>
  )
}
