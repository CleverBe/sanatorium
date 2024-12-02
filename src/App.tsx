import { RouterProvider } from "react-router-dom";
import { TanstackQueryProvider } from "./providers/QueryClient";
import { router } from "./routes/privateRoutes";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <TanstackQueryProvider>
      <RouterProvider router={router} />
      <Toaster />
    </TanstackQueryProvider>
  );
}

export default App;
