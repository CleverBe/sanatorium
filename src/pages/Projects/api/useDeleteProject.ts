import { useMutation, useQueryClient } from "@tanstack/react-query"
import { projectsKeys } from "./querykeys"
import { toast } from "sonner"
import { api } from "@/lib/axios"

export const deleteProjectFn = async ({ id }: { id: number }) => {
  const { data } = await api.delete(`/proyectos/${id}`)

  return data
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
