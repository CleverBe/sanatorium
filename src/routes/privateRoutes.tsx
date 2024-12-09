import { AppLayout } from "@/layouts/AppLayout"
import { Dashboard } from "@/pages/Dashboard/Dashboard"
import { EmployeesPage } from "@/pages/Employees/EmployeesPage"
import { ErrorPage } from "@/pages/Error/ErrorPage"
import { LoginPage } from "@/pages/Login/LoginPage"
import { ProfilePage } from "@/pages/Profile/ProfilePage"
import { ProjectsPage } from "@/pages/Projects/ProjectsPage"
import { ReportsPage } from "@/pages/Reports/ReportsPage"
import { UnauthorizedPage } from "@/pages/Unauthorized/UnauthorizedPage"
import { RoleEnum } from "@/pages/Users/types"
import { UsersPage } from "@/pages/Users/UsersPage"
import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AppLayout allowedRoles={[RoleEnum.ADMIN]} />,
        children: [
          {
            path: "usuarios",
            element: <UsersPage />,
          },
        ],
      },
      {
        element: <AppLayout allowedRoles={[RoleEnum.MANAGER]} />,
        children: [
          {
            path: "empleados",
            element: <EmployeesPage />,
          },
        ],
      },
      {
        element: (
          <AppLayout allowedRoles={[RoleEnum.ADMIN, RoleEnum.MANAGER]} />
        ),
        children: [
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
        element: (
          <AppLayout
            allowedRoles={[RoleEnum.ADMIN, RoleEnum.MANAGER, RoleEnum.EMPLOYEE]}
          />
        ),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "perfil",
            element: <ProfilePage />,
          },
          {
            path: "unauthorized",
            element: <UnauthorizedPage />,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
])
