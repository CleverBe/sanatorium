import { RouterProvider } from "react-router-dom"
import { TanstackQueryProvider } from "./providers/QueryClient"
import { Toaster } from "sonner"
import { router } from "./routes/privateRoutes"

function App() {
  return (
    <TanstackQueryProvider>
      <RouterProvider router={router} />
      <Toaster />
    </TanstackQueryProvider>
  )
}

export default App
