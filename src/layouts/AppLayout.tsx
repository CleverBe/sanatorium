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
  const { accessToken } = useAuth()
  const {
    data: user,
    isLoading,
    isError,
  } = useGetCurrentUser({ enabled: !!accessToken })
  const userRoles: RoleEnum[] = user?.role ? [user.role] : []
  const location = useLocation()

  if (isLoading) {
    return (
      <main className="flex h-screen items-center justify-center">
        <Spinner className="h-12 w-12" />
      </main>
    )
  }

  if (!user || isError) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return (
    <main className="relative flex min-h-svh flex-col bg-primary/10">
      <div className="relative mx-auto flex flex-1 flex-col border-x bg-background lg:container">
        <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)]">
          <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
          <div className="relative h-full overflow-y-auto px-4 pt-6 lg:pt-8">
            <div className="mx-auto h-full w-full min-w-0">
              {userRoles.find((role) => allowedRoles.includes(role)) ? (
                <Outlet />
              ) : (
                <Navigate
                  to="/unauthorized"
                  state={{ from: location }}
                  replace
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
