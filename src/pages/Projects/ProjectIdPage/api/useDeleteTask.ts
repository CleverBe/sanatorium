import { sleepAppWithData } from "@/helpers/sleep"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { userTasksKeys } from "./querykeys"
import { toast } from "sonner"

export const deleteTaskFn = ({ id }: { id: string }) => {
  return sleepAppWithData(1000, id).then((id) => {
    return { id }
  })
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

      toast.success(`Eliminado con exito`)
    },
    onError: () => {
      toast.error("Error al eliminar")
    },
  })
}
