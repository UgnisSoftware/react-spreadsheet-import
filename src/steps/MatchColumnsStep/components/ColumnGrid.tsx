import type React from "react"
import type { Column, Columns } from "../MatchColumnsStep"
import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { FadingWrapper } from "../../../components/FadingWrapper"

const MATCH_COLUMNS_TITLE = "Validate column matching"
const USER_TABLE_TITLE = "Your table"
const TEMPLATE_TITLE = "Will become"

type ColumnGridProps = {
  columns: Columns
  userColumn: (column: Column) => React.ReactNode
  templateColumn: (column: Column) => React.ReactNode
}

export const ColumnGrid = ({ columns, userColumn, templateColumn }: ColumnGridProps) => {
  return (
    <Flex flex={1} flexDir="column" minH={"100vh"} px={4}>
      <Heading size="lg" mb={8}>
        {MATCH_COLUMNS_TITLE}
      </Heading>
      <Flex
        flex={1}
        display="grid"
        gridTemplateRows="auto auto auto 1fr"
        gridTemplateColumns={`0.75rem repeat(${columns.length}, minmax(20rem, auto)) 0.75rem`}
      >
        <Box gridColumn={`1/${columns.length + 3}`}>
          <Text fontSize="2xl" lineHeight={8} fontWeight="semibold" mb={4}>
            {USER_TABLE_TITLE}
          </Text>
        </Box>
        {columns.map((column, index) => (
          <Box gridRow="2/3" gridColumn={`${index + 2}/${index + 3}`} pt={3} key={column.header}>
            {userColumn(column)}
          </Box>
        ))}
        <FadingWrapper gridColumn={`1/${columns.length + 3}`} gridRow="2/3" />
        <Box gridColumn={`1/${columns.length + 1}`}>
          <Text fontSize="2xl" lineHeight={8} fontWeight="semibold" mb={4} mt={7}>
            {TEMPLATE_TITLE}
          </Text>
        </Box>
        <FadingWrapper gridColumn={`1/${columns.length + 3}`} gridRow="4/5" />
        {columns.map((column, index) => (
          <Box gridRow="4/5" gridColumn={`${index + 2}/${index + 3}`} key={column.index} py="1.125rem" pl={2} pr={3}>
            {templateColumn(column)}
          </Box>
        ))}
      </Flex>
    </Flex>
  )
}
