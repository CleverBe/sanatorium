import { sleepAppWithData } from "@/helpers/sleep"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { projectsKeys } from "./querykeys"
import { toast } from "sonner"

export const deleteProjectFn = ({ id }: { id: string }) => {
  return sleepAppWithData(1000, id).then((id) => {
    return { id }
  })
}

export const useDeleteProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteProjectFn,
    onSuccess: (data) => {
      queryClient.removeQueries({
        queryKey: projectsKeys.list(data.id),
        exact: true,
      })

      queryClient.invalidateQueries({ queryKey: projectsKeys.lists() })

      toast.success(`Eliminado con exito`)
    },
    onError: () => {
      toast.error("Error al eliminar")
    },
  })
}
