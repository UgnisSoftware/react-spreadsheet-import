import React from "react"
import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { FadingWrapper } from "./FadingWrapper"
import { UserTableColumn } from "./UserTableColumn"

const MATCH_COLUMNS_TITLE = "Validate column matching"
const USER_TABLE_TITLE = "Your table"
const TEMPLATE_TITLE = "Will become"

type MatchColumnsProps = {
  data: (string | number)[][]
  headerIndex: number
}

export const MatchColumns = ({ data, headerIndex }: MatchColumnsProps) => {
  const header = data[headerIndex]
  const dataExample = data.slice(headerIndex + 1, 3)

  return (
    <Flex flex={1} flexDir="column" minH={"100vh"} px={4}>
      <Heading size="lg" mb={8}>
        {MATCH_COLUMNS_TITLE}
      </Heading>
      <Flex
        flex={1}
        display="grid"
        gridTemplateRows="auto auto auto 1fr"
        gridTemplateColumns={`0.75rem repeat(${header.length}, minmax(20rem, auto)) 0.75rem`}
      >
        <Box gridColumn={`1/${header.length + 3}`}>
          <Text fontSize="2xl" lineHeight={8} fontWeight="semibold" mb={4}>
            {USER_TABLE_TITLE}
          </Text>
        </Box>
        {header.map((header, index) => (
          <Box gridRow="2/3" gridColumn={`${index + 2}/${index + 3}`} pt={3} key={header}>
            <UserTableColumn header={header} entries={dataExample.map((row) => row[index])} />
          </Box>
        ))}
        <FadingWrapper gridColumn={`1/${header.length + 3}`} gridRow="2/3" />
        <Box gridColumn={`1/${header.length + 1}`}>
          <Text fontSize="2xl" lineHeight={8} fontWeight="semibold" mb={4} mt={7}>
            {TEMPLATE_TITLE}
          </Text>
        </Box>
        <FadingWrapper gridColumn={`1/${header.length + 3}`} gridRow="4/5" />
        {header.map((header, index) => (
          <Box gridRow="4/5" gridColumn={`${index + 2}/${index + 3}`} key={header} py={3}>
            {header}
          </Box>
        ))}
      </Flex>
    </Flex>
  )
}
