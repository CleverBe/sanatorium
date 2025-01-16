import { useMutation, useQueryClient } from "@tanstack/react-query"
import { myProjectTasksKeys, userTasksKeys } from "./querykeys"
import { toast } from "sonner"
import { api } from "@/lib/axios"

export const deleteTaskFn = async ({ id }: { id: number }) => {
  const { data } = await api.delete(`/tareas/${id}/`)

  return data
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTaskFn,
    onSuccess: (data) => {
      queryClient.removeQueries({
        queryKey: userTasksKeys.list(data.id),
        exact: true,
      })

      queryClient.invalidateQueries({ queryKey: userTasksKeys.all })
      queryClient.invalidateQueries({ queryKey: myProjectTasksKeys.all })

      toast.success(`Eliminada con exito`)
    },
    onError: () => {
      toast.error("Error al eliminar")
    },
  })
}
