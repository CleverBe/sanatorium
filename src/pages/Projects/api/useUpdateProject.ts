import { sleepAppWithData } from "@/helpers/sleep"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { UpdateProjectInput } from "../schemas/ProjectSchema"
import { projectsKeys } from "./querykeys"

export type UpdateProjectApiInput = Partial<UpdateProjectInput> & {
  id: string
}

export const updateProjectFn = ({ data }: { data: UpdateProjectApiInput }) => {
  return sleepAppWithData(1000, data).then((data) => {
    return data
  })
}

export const useUpdateProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProjectFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: projectsKeys.lists() })

      toast.success(`Proyecto ${data.name} actualizado con exito`)
    },
    onError: () => {
      toast.error("Error al actualizar")
    },
  })
}
