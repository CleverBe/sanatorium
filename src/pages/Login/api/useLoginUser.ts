import { LoginInput } from "../schemas/LoginSchema"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useAuth } from "@/hooks/useAuth"
import { api } from "@/lib/axios"
import { RoleEnum } from "@/pages/Users/types"

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
    }
  }
}

export const loginUserFn = async (user: LoginInput) => {
  const dataToSend = { ...user }

  const { data: response } = await api.post<ILoginResponse>(
    "/login/",
    dataToSend,
  )

  return response
}

export const useLoginUser = () => {
  const { setAccessToken } = useAuth()
  return useMutation({
    mutationFn: loginUserFn,
    onSuccess: (data) => {
      localStorage.setItem("token", data.access)

      setAccessToken(data.access)

      toast.success("Ingresaste con exito")
    },
    onError: () => {
      toast.error("Credenciales incorrectas")
    },
  })
}
