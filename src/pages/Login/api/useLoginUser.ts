import { LoginInput } from "../schemas/LoginSchema"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useAuth } from "@/hooks/useAuth"
import { api } from "@/lib/axios"
import { RoleEnum } from "@/pages/Users/types"
import { mockedUsers } from "@/db/db"

export interface IRefreshTokenResponse {
  access: string
}

export const refreshTokenFn = async ({
  refreshToken,
}: {
  refreshToken: string
}): Promise<IRefreshTokenResponse> => {
  const { data: response } = await api.post<IRefreshTokenResponse>(
    "/refresh/",
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
  // const dataToSend = { ...user }

  // const { data: response } = await api.post<ILoginResponse>(
  //   "/login/",
  //   dataToSend,
  // )

  const foundUser = mockedUsers.find((u) => u.email === user.email)
  if (!foundUser) throw new Error("Credenciales incorrectas")
  const response = {
    access: foundUser.id.toString(),
    refresh: foundUser.id.toString(),
    user: foundUser,
  }

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
