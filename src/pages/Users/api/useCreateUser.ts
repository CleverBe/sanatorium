import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { CreateUserInput } from "../schemas/UserSchema"
import { usersKeys } from "./querykeys"
import { api } from "@/lib/axios"
import { UserApi } from "../types"

export const createUserFn = async ({ data }: { data: CreateUserInput }) => {
  const dataToSend = {
    nombre: data.name,
    email: data.email,
    password: data.password,
    rol: data.role,
  }

  const { data: response } = await api.post<UserApi>("/usuarios/", dataToSend)

  return response
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUserFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() })

      toast.success(`Usuario ${data.nombre} creado con exito`)
    },
    onError: () => {
      toast.error("Error al crear")
    },
  })
}
