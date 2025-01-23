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
    <main className="">
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div
        className="h-[calc(100vh-3.5rem)] px-4 py-6 md:ml-64"
        id="main-content"
      >
        <div className="mt-14 h-full">
          {userRoles.find((role) => allowedRoles.includes(role)) ? (
            <Outlet />
          ) : (
            <Navigate to="/unauthorized" state={{ from: location }} replace />
          )}
        </div>
      </div>
    </main>
  )
}
