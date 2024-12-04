import { sleepAppWithData } from "@/helpers/sleep"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { usersKeys } from "./querykeys"
import { toast } from "sonner"

export const deleteUserFn = ({ id }: { id: string }) => {
  return sleepAppWithData(1000, id).then((id) => {
    return { id }
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteUserFn,
    onSuccess: (data) => {
      queryClient.removeQueries({
        queryKey: usersKeys.list(data.id),
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
