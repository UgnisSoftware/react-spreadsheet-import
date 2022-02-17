import React from "react"
import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { FadingWrapper } from "./FadingWrapper"

const MATCH_COLUMNS_TITLE = "Validate column matching"
const USER_TABLE_TITLE = "Your table"
const TEMPLATE_TITLE = "Will become"

type MatchColumnsProps = {
  headerRow: string[]
}

export const MatchColumns = ({ headerRow }: MatchColumnsProps) => {
  return (
    <Flex flex={1} flexDir="column" minH={"100vh"}>
      <Heading size="lg" mb={8}>
        {MATCH_COLUMNS_TITLE}
      </Heading>
      <Flex
        flex={1}
        display="grid"
        gridTemplateRows="auto 1fr auto 1fr"
        gridTemplateColumns={`repeat(${headerRow.length}, minmax(20rem, 1fr))`}
      >
        <Box gridColumn={`1/${headerRow.length + 1}`}>
          <Text fontSize="2xl" lineHeight={8} fontWeight="semibold" mb={4}>
            {USER_TABLE_TITLE}
          </Text>
        </Box>
        <FadingWrapper gridColumn={`1/${headerRow.length + 1}`} gridRow="2/3" />
        {headerRow.map((header, index) => (
          <Box gridRow="2/3" gridColumn={`${index + 1}/${index + 2}`}>
            {header}
          </Box>
        ))}
        <Box gridColumn={`1/${headerRow.length + 1}`}>
          <Text fontSize="2xl" lineHeight={8} fontWeight="semibold" mb={4} mt={8}>
            {TEMPLATE_TITLE}
          </Text>
        </Box>
        <FadingWrapper gridColumn={`1/${headerRow.length + 1}`} gridRow="4/5" />
        {headerRow.map((header, index) => (
          <Box gridRow="4/5" gridColumn={`${index + 1}/${index + 2}`}>
            {header}
          </Box>
        ))}
      </Flex>
    </Flex>
  )
}
