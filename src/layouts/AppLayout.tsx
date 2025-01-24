import { Header } from "@/components/Header"
import { Sidebar } from "@/components/Sidebar"
import { Spinner } from "@/components/Spinner"
import { useAuth } from "@/hooks/useAuth"
import { api } from "@/lib/axios"
import { refreshTokenFn } from "@/pages/Login/api/useLoginUser"
import { useGetCurrentUser } from "@/pages/Profile/api/useGetCurrentUser"
import { RoleEnum } from "@/pages/Users/types"
import { useLayoutEffect, useState } from "react"
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"

export const AppLayout = ({ allowedRoles }: { allowedRoles: RoleEnum[] }) => {
  const [showSidebar, setShowSidebar] = useState(false)
  const { accessToken, clearTokens } = useAuth()
  const {
    data: user,
    isLoading,
    isError,
  } = useGetCurrentUser({ enabled: !!accessToken })
  const userRoles: RoleEnum[] = user?.role ? [user.role] : []
  const location = useLocation()
  const navigate = useNavigate()

  useLayoutEffect(() => {
    // Interceptor para incluir el access token
    const requestInterceptor = api.interceptors.request.use((config) => {
      const accessToken = localStorage.getItem("accessToken")
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
      return config
    })

    // Interceptor para manejar expiración del token
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config

        // Detectar si el error es por token expirado
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true // Evitar que este interceptor se ejecute de nuevo en esta misma solicitud

          try {
            const refreshToken = localStorage.getItem("refreshToken")
            if (!refreshToken) {
              throw new Error("No hay refresh token disponible.")
            }

            // Verificar si el error es del refresh token
            if (
              error.response?.data?.code === "token_not_valid" &&
              error.response?.data?.detail === "Token is invalid or expired"
            ) {
              console.error("El refresh token ha expirado o es inválido.")
              clearTokens()
              navigate("/login") // Redirigir al login
              return Promise.reject(error)
            }

            // Solicitar un nuevo access token con el refresh token
            const data = await refreshTokenFn({ refreshToken })

            // Guardar los nuevos tokens
            localStorage.setItem("accessToken", data.access)
            localStorage.setItem("refreshToken", data.refresh)

            // Reintentar la solicitud original con el nuevo access token
            originalRequest.headers.Authorization = `Bearer ${data.access}`
            return api(originalRequest)
          } catch (refreshError) {
            console.error("Error al refrescar el token:", refreshError)
            clearTokens()
            navigate("/login") // Redirigir al login en caso de error
            return Promise.reject(refreshError)
          }
        }

        // Si no es un error relacionado con autenticación, simplemente lo lanzamos
        return Promise.reject(error)
      },
    )

    return () => {
      api.interceptors.request.eject(requestInterceptor)
      api.interceptors.response.eject(responseInterceptor)
    }
  }, [clearTokens, navigate])

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
      <Header setShowSidebar={setShowSidebar} />
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
