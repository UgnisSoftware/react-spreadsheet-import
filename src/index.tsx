import { ChakraProvider } from "@chakra-ui/react"
import { UploadFlow } from "~/components/UploadFlow"

export default function App() {
  return (
    <ChakraProvider>
      <UploadFlow />
    </ChakraProvider>
  )
}
