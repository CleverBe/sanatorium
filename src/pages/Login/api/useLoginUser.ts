import { sleepAppWithData } from "@/helpers/sleep"
import { LoginInput } from "../schemas/LoginSchema"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { mockedUsers } from "@/pages/Users/api/useGetUsers"
import { useAuth } from "@/hooks/useLoggedUser"
import api from "@/lib/axios"

export interface ILoginResponse {
  status: string
  accessToken: string
}

export const refreshAccessTokenFn = async () => {
  const response = await api.get<ILoginResponse>("auth/refresh")

  return response.data
}

export const loginUserFn = async (user: LoginInput) => {
  //   const response = await api.post<ILoginResponse>("auth/login", user);

  //   return response.data;

  return sleepAppWithData(1000, user).then((user) => {
    const foundUser = mockedUsers.find((u) => u.email === user.email)

    if (foundUser) {
      return {
        status: "success",
        accessToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        user: {
          id: foundUser.id,
          name: `${foundUser.firstname} ${foundUser.lastname}`,
          email: foundUser.email,
          role: foundUser.role,
          image: foundUser.image,
        },
      }
    } else {
      throw new Error("Credenciales incorrectas")
    }
  })
}

export const useLoginUser = () => {
  const { setUser } = useAuth()
  return useMutation({
    mutationFn: loginUserFn,
    onSuccess: (data) => {
      localStorage.setItem("token", data.accessToken)

      setUser(data.user)

      toast.success("Ingresaste con exito")
    },
    onError: () => {
      toast.error("Credenciales incorrectas")
    },
  })
}
