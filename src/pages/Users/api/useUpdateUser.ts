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
  const formData = new FormData()

  if (data.name) {
    formData.append("nombre", data.name)
  }
  if (data.email) {
    formData.append("email", data.email)
  }
  if (data.password) {
    formData.append("password", data.password)
  }
  if (data.role) {
    formData.append("rol", data.role)
  }
  if (data.password) {
    formData.append("password", data.password)
  }
  if (data.image) {
    formData.append("image", data.image[0])
  }

  const { data: response } = await api.patch<UserApi>(
    `/usuarios/${data.id}/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  )

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
