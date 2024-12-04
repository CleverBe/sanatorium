import { RouterProvider } from "react-router-dom"
import { TanstackQueryProvider } from "./providers/QueryClient"
import { Toaster } from "sonner"
import { router } from "./routes/PrivateRoutes"

function App() {
  return (
    <TanstackQueryProvider>
      <RouterProvider router={router} />
      <Toaster />
    </TanstackQueryProvider>
  )
}

export default App
