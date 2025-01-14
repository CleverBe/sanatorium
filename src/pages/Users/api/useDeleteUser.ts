import { useMutation, useQueryClient } from "@tanstack/react-query"
import { usersKeys } from "./querykeys"
import { toast } from "sonner"
import { api } from "@/lib/axios"

export const deleteUserFn = async ({ id }: { id: number }) => {
  const { data: response } = await api.delete(`/usuarios/${id}`)

  return response
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteUserFn,
    onSuccess: (_, variables) => {
      queryClient.removeQueries({
        queryKey: usersKeys.list(variables.id),
        exact: true,
      })

      queryClient.invalidateQueries({ queryKey: usersKeys.lists() })

      toast.success(`Eliminado con exito`)
    },
    onError: () => {
      toast.error("Error al eliminar")
    },
  })
}
