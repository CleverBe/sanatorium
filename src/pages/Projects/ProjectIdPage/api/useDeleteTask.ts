import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { api } from "@/lib/axios"
import { tasksKeys } from "@/pages/Tasks/api/querykeys"

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
        queryKey: tasksKeys.byId(data.id),
        exact: true,
      })

      queryClient.invalidateQueries({ queryKey: tasksKeys.all })

      toast.success(`Eliminada con exito`)
    },
    onError: () => {
      toast.error("Error al eliminar")
    },
  })
}
