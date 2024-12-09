import { Header } from "@/components/Header"
import { Sidebar } from "@/components/Sidebar"
import { useAuth } from "@/hooks/useLoggedUser"
import { useState } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"

export const AppLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  const { isLoggedIn } = useAuth()
  const location = useLocation()

  return isLoggedIn ? (
    <main className="">
      <div className="container relative mx-auto bg-background">
        <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <Sidebar showSidebar={showSidebar} />
        <div className="p-4 sm:ml-64">
          <Outlet />
        </div>
      </div>
    </main>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}
