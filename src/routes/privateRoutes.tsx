import { AppLayout } from "@/layouts/AppLayout"
import { Dashboard } from "@/pages/Dashboard/Dashboard"
import { ErrorPage } from "@/pages/Error/ErrorPage"
import { LoginPage } from "@/pages/Login/LoginPage"
import { ProjectsPage } from "@/pages/Projects/ProjectsPage"
import { ReportsPage } from "@/pages/Reports/ReportsPage"
import { UsersPage } from "@/pages/Users/UsersPage"
import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "usuarios",
        element: <UsersPage />,
      },
      {
        path: "proyectos",
        element: <ProjectsPage />,
      },
      {
        path: "reportes",
        element: <ReportsPage />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
])
