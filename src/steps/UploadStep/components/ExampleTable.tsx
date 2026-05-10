import type { Fields } from "@/types"
import { useMemo } from "react"
import { Table } from "@/components/ui/Table"
import { generateColumns } from "./columns"
import { generateExampleRow } from "@/steps/UploadStep/utils/generateExampleRow"

interface Props<T extends string> {
  fields: Fields<T>
}

export const ExampleTable = <T extends string>({ fields }: Props<T>) => {
  const data = useMemo(() => generateExampleRow(fields), [fields])
  const columns = useMemo(() => generateColumns(fields), [fields])

  return <Table rows={data} columns={columns} className="rdg-example" />
}
