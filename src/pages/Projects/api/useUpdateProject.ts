import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { projectsKeys } from "./querykeys"
import { api } from "@/lib/axios"
import { ProjectApi } from "../types"
import { UpdateProjectInput } from "../schemas/ProjectSchema"

export type UpdateProjectApiInput = Partial<UpdateProjectInput> & {
  id: number
}

export const updateProjectFn = async ({
  data,
}: {
  data: UpdateProjectApiInput
}) => {
  const dataToSend = {
    nombre: data.name,
    descripcion: data.description,
    fecha_inicio: data.startDate,
    fecha_fin: data.endDate,
    estado: data.status,
    encargado: data.inCharge,
    empleados: data.employees,
  }

  const { data: response } = await api.put<ProjectApi>(
    `/proyectos/${data.id}/`,
    dataToSend,
  )

  return response
}

export const useUpdateProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProjectFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: projectsKeys.lists() })

      toast.success(`Proyecto ${data.nombre} actualizado con exito`)
    },
    onError: () => {
      toast.error("Error al actualizar")
    },
  })
}
