import { sleepAppWithData } from "@/helpers/sleep"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { CreateProjectInput } from "../schemas/ProjectSchema"
import { projectsKeys } from "./querykeys"

export const createProjectFn = ({ data }: { data: CreateProjectInput }) => {
  return sleepAppWithData(1000, data).then((data) => {
    return data
  })
}

export const useCreateProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createProjectFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: projectsKeys.lists() })

      toast.success(`Proyecto ${data.name} creado con exito`)
    },
    onError: () => {
      toast.error("Error al crear")
    },
  })
}
