import { refreshTokenFn } from "@/pages/Login/api/useLoginUser"
import axios from "axios"

const BASE_URL = "https://backend-sanatorium-business.onrender.com/api/"

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

api.defaults.headers.common["Content-Type"] = "application/json"

// Interceptor para incluir el access token
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken")
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

// Interceptor para manejar expiración del token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Detectar si el error es por token expirado
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem("refreshToken")
        if (!refreshToken) throw new Error("No hay refresh token disponible.")

        // Solicitar un nuevo access token
        const data = await refreshTokenFn({ refreshToken })

        // Guardar el nuevo access token
        localStorage.setItem("accessToken", data.access)

        // Reintentar la solicitud original
        originalRequest.headers.Authorization = `Bearer ${data.access}`
        return api(originalRequest)
      } catch (refreshError) {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        window.location.href = "/login"
        throw refreshError
      }
    }

    throw error
  },
)

export { api }
