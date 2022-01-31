import React, { useMemo } from "react"
import { MatchColumnsFields } from "./MatchColumnsFields"
import { generateOptions } from "../utils/generateOptions"
import { Box, Text, Button } from "@chakra-ui/react"

const MATCH_COLUMNS_TITLE = "Validate if columns were matched correctly"
const CANCEL_BUTTON_TITLE = "Cancel"
const CONFIRM_BUTTON_TITLE = "Confirm and continue"
const REQUIRED_ERROR_TEXT = "Required"
const DUPLICATE_COLUMN_TEXT = "Duplicate column"

type MatchColumnsProps = {
  onCancel: () => void
  headerValues: string[]
  table: any
  onContinue: (matchedColumns: object) => void
  error?: string
  values: object
  loading: boolean
}
export const MatchColumns = ({
  onCancel,
  headerValues,
  table,
  onContinue,
  error,
  values,
  loading,
}: MatchColumnsProps) => {
  const options = useMemo(() => generateOptions(table), [table])
  // const generatedSchema = useMemo(
  //   () =>
  //     yup.object(
  //       Object.fromEntries(
  //         headerValues.map((headerValue) => [
  //           headerValue,
  //           yup
  //             .string()
  //             .required(REQUIRED_ERROR_TEXT)
  //             .test(
  //               "duplicate",
  //               DUPLICATE_COLUMN_TEXT,
  //               (value: string | undefined, context: { [key: string]: any }): any => {
  //                 const isUnique =
  //                   Object.values(context.parent).filter((parentValue) => value && parentValue === value).length <= 1
  //                 return isUnique
  //               },
  //             ),
  //         ]),
  //       ),
  //     ),
  //   [headerValues],
  // )

  //<Form onSubmit={onContinue} initialValues={values} validation={generatedSchema}>

  return (
    <>
      <Box minH="5.375rem" display="flex" alignItems="center" px="0.75rem">
        <Text variant="h5" mr="1rem">
          {MATCH_COLUMNS_TITLE}
        </Text>
        <Box display="flex" flex={1} justifyContent="flex-end">
          <Button variant="outline" mr="1rem" onClick={onCancel}>
            {CANCEL_BUTTON_TITLE}
          </Button>
          <Button type="submit" isLoading={loading}>
            {CONFIRM_BUTTON_TITLE}
          </Button>
        </Box>
      </Box>
      {error && (
        <Text color="red.500" pl={1} pb={1}>
          {error}
        </Text>
      )}
      <MatchColumnsFields headerValues={headerValues} options={options} />
    </>
  )
}
