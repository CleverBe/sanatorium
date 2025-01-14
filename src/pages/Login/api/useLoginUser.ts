import { sleepAppWithData } from "@/helpers/sleep"
import { LoginInput } from "../schemas/LoginSchema"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useAuth } from "@/hooks/useAuth"
import { api } from "@/lib/axios"
import { mockedUsers } from "@/db/db"

export interface ILoginResponse {
  status: string
  accessToken: string
}

export const refreshAccessTokenFn = async () => {
  const response = await api.get<ILoginResponse>("auth/refresh")

  return response.data
}

export const loginUserFn = async (user: LoginInput) => {
  return sleepAppWithData(1000, user).then((user) => {
    const foundUser = mockedUsers.find((u) => u.email === user.email)

    if (foundUser) {
      return {
        status: "success",
        accessToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      }
    } else {
      throw new Error("Credenciales incorrectas")
    }
  })
}

export const useLoginUser = () => {
  const { setAccessToken } = useAuth()
  return useMutation({
    mutationFn: loginUserFn,
    onSuccess: (data) => {
      localStorage.setItem("token", data.accessToken)

      setAccessToken(data.accessToken)

      toast.success("Ingresaste con exito")
    },
    onError: () => {
      toast.error("Credenciales incorrectas")
    },
  })
}
