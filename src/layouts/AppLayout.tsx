import { Header } from "@/components/Header"
import { Sidebar } from "@/components/Sidebar"
import { Spinner } from "@/components/Spinner"
import { useAuth } from "@/hooks/useAuth"
import { useGetCurrentUser } from "@/pages/Profile/api/useGetCurrentUser"
import { RoleEnum } from "@/pages/Users/types"
import { useState } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"

export const AppLayout = ({ allowedRoles }: { allowedRoles: RoleEnum[] }) => {
  const [showSidebar, setShowSidebar] = useState(false)
  const { isLoggedIn } = useAuth()
  const { data: user, isLoading } = useGetCurrentUser({ enabled: isLoggedIn })
  const userRoles: RoleEnum[] = user?.role ? [user.role] : []
  const location = useLocation()

  if (isLoading) {
    return (
      <main className="flex h-screen items-center justify-center">
        <Spinner className="h-12 w-12" />
      </main>
    )
  }

  return (
    <main className="relative flex min-h-svh flex-col">
      <div className="relative mx-auto flex flex-1 flex-col border-x bg-background lg:container">
        <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)]">
          <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
          <div className="relative px-4 py-6 lg:py-8">
            <div className="mx-auto w-full min-w-0">
              {userRoles.find((role) => allowedRoles.includes(role)) ? (
                <Outlet />
              ) : user ? (
                <Navigate
                  to="/unauthorized"
                  state={{ from: location }}
                  replace
                />
              ) : (
                <Navigate to="/login" state={{ from: location }} replace />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
