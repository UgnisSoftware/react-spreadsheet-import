import { theme } from "../components/ReactSpreadsheetImport"
import { MatchColumns } from "../components/MatchColumns"
import { Providers } from "../components/Providers"
import { mockRsiValues } from "./mockRsiValues"

export default {
  title: "MatchColumns",
}

const headerRow = ["Name", "Surname", "Age", "Gender"]

export const Basic = () => (
  <Providers theme={theme} rsiValues={mockRsiValues}>
    <MatchColumns headerRow={headerRow} />
  </Providers>
)
