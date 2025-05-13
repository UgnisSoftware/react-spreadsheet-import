import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Button } from "./components/ui/button.tsx"
import { ReactSpreadsheetImport } from "./ReactSpreadsheetImport.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactSpreadsheetImport>
      <Button>Open</Button>
    </ReactSpreadsheetImport>
  </StrictMode>,
)
