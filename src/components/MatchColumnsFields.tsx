import React, { useCallback } from "react"
import { Box, Select, Text } from "@chakra-ui/react"

const GRID_COLUMN_TITLE_1 = "Your columns"
const GRID_COLUMN_TITLE_2 = "Column names after upload"

type MatchColumnsFieldsProps = {
  headerValues: string[]
  options: {
    label: string
    name: string
  }[]
}

export const MatchColumnsFields = ({ options }: MatchColumnsFieldsProps) => {
  const form: any = {}

  const deleteColumn = () => {}

  return (
    <Box
      display="grid"
      pl={1}
      minW="32rem"
      gridTemplateColumns="11.25rem 16.25rem 1rem"
      gridTemplateRows="1rem"
      gridGap="1.5rem"
    >
      <Text pt="0.3rem">{GRID_COLUMN_TITLE_1}</Text>
      <Text pt="0.3rem">{GRID_COLUMN_TITLE_2}</Text>
      <Box />
      {Object.keys(form?.values)?.map((header) => {
        return (
          <React.Fragment key={header}>
            <Box bg="primary.50" display="flex" alignItems="center" maxH="2.5rem">
              <Text color="primary.800" px="0.75rem" isTruncated>
                {header}
              </Text>
            </Box>
            {/*todo remove label and type casting when Select is fixed*/}
            <Select
              onChange={async () => {
                form.validate().catch(() => {})
              }}
              name={header}
            />
            <Text color="neutral.800" fontSize="1.1rem" ml="-1rem" maxH="2.5rem" onClick={() => deleteColumn()}>
              Delete
            </Text>
          </React.Fragment>
        )
      })}
    </Box>
  )
}
