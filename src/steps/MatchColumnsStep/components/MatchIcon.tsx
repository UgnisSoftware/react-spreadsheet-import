import { Box, Flex } from "@chakra-ui/react"
import { CgCheck } from "react-icons/cg"

type MatchIconProps = {
  isChecked: boolean
}

export function MatchIcon(props: MatchIconProps) {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      borderRadius="50%"
      borderWidth="2px"
      bg="background"
      borderColor="yellow.500"
      color="background"
      transitionDuration="ultra-fast"
      _highlighted={{
        bg: "green.500",
        borderColor: "green.500",
      }}
      minW={6}
      minH={6}
      w={6}
      h={6}
      ml={3.5}
      mr={3}
      data-highlighted={props.isChecked ? "" : undefined}
      data-testid="column-checkmark"
    >
      {props.isChecked && (
        <Box
          data-state="open"
          _open={{
            animationName: "matchIconScaleIn",
            animationDuration: "0.1s",
            animationTimingFunction: "ease-in-out",
          }}
          _closed={{
            animationName: "matchIconScaleOut",
            animationDuration: "0.1s",
            animationTimingFunction: "ease-in-out",
          }}
        >
          <CgCheck size="24px" />
        </Box>
      )}
    </Flex>
  )
}
