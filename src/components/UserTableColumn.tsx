import { Flex, Text, CloseButton, Box } from "@chakra-ui/react"

type UserTableColumnProps = {
  header: string | number
  entries: (string | number)[]
}

export const UserTableColumn = ({ header, entries }: UserTableColumnProps) => {
  return (
    <Box>
      <Flex px={6} justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="xs" lineHeight={4} fontWeight="bold" letterSpacing="wider" color="gray.700">
          {header}
        </Text>
        <CloseButton size="sm" bg="gray.100" />
      </Flex>
      {entries.map((entry) => (
        <Text fontSize="sm" lineHeight={5} fontWeight="medium" px={6} py={4}>
          {entry}
        </Text>
      ))}
    </Box>
  )
}
