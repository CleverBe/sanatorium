import { LoginInput } from "../schemas/LoginSchema"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useAuth } from "@/hooks/useAuth"
import { api } from "@/lib/axios"
import { RoleEnum } from "@/pages/Users/types"

export interface IRefreshTokenResponse {
  access: string
  refresh: string
}

export const refreshTokenFn = async ({
  refreshToken,
}: {
  refreshToken: string
}): Promise<IRefreshTokenResponse> => {
  const { data: response } = await api.post<IRefreshTokenResponse>(
    "/auth/refresh/",
    { refresh: refreshToken },
  )

  return response
}

export interface ILoginResponse {
  access: string
  refresh: string
  user: {
    id: number
    nombre: string
    email: string
    rol: RoleEnum
    created_at: string
    updated_at: string
    encargado: {
      id: number
      nombre: string
      email: string
      rol: RoleEnum
    } | null
  }
}

export const loginUserFn = async (user: LoginInput) => {
  const dataToSend = { ...user }

  const { data: response } = await api.post<ILoginResponse>(
    "/auth/login/",
    dataToSend,
  )

  return response
}

export const useLoginUser = () => {
  const { saveTokens } = useAuth()

  return useMutation({
    mutationFn: loginUserFn,
    onSuccess: (data) => {
      saveTokens(data.access, data.refresh)

      toast.success("Ingresaste con exito")
    },
    onError: () => {
      toast.error("Credenciales incorrectas")
    },
  })
}
