import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { UpdateUserInput } from "../schemas/UserSchema"
import { usersKeys } from "./querykeys"
import { api } from "@/lib/axios"
import { UserApi } from "../types"

export type UpdateUserApiInput = Partial<UpdateUserInput> & {
  id: number
  newPassword?: string
}

export const updateUserFn = async ({ data }: { data: UpdateUserApiInput }) => {
  const dataToSend = {
    nombre: data.name,
    email: data.email,
    password: data.password,
    rol: data.role,
  }

  const { data: response } = await api.patch<UserApi>("/usuarios", dataToSend)

  return response
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUserFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() })

      toast.success(`Usuario ${data.nombre} actualizado con exito`)
    },
    onError: () => {
      toast.error("Error al actualizar")
    },
  })
}
