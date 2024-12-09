import { Header } from "@/components/Header"
import { Sidebar } from "@/components/Sidebar"
import { useAuth } from "@/hooks/useLoggedUser"
import api from "@/lib/axios"
import { refreshAccessTokenFn } from "@/pages/Login/api/useLoginUser"
import { useEffect, useLayoutEffect, useState } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"

export const AppLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  const { user } = useAuth()
  const location = useLocation()
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    // const fetchUser = async () => {
    //   try {
    //     const response = await api.get<IUserResponse>("users/me")
    //     setToken(response.data.accessToken)
    //   } catch {
    //     setToken(null)
    //   }
    // }
    // fetchUser()
  }, [])

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      config.headers.Authorization =
        // @ts-ignore
        !config._retry && token
          ? `Bearer ${token}`
          : config.headers.Authorization
      return config
    })

    return () => {
      api.interceptors.request.eject(authInterceptor)
    }
  }, [token])

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config

        const errMessage: string | undefined = error.response?.data.message

        if (errMessage?.includes("not logged in")) {
          try {
            const response = await refreshAccessTokenFn()

            setToken(response.accessToken)

            originalRequest.headers.Authorization = `Bearer ${response.accessToken}`
            originalRequest._retry = true

            return api(originalRequest)
          } catch {
            setToken(null)
          }
        }

        if (errMessage?.includes("not refresh")) {
          document.location.href = "/login"
        }

        return await Promise.reject(error)
      },
    )

    return () => {
      api.interceptors.response.eject(refreshInterceptor)
    }
  }, [])

  return user ? (
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
