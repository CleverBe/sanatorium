import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { CreateProjectInput } from "../schemas/ProjectSchema"
import { projectsKeys } from "./querykeys"
import { api } from "@/lib/axios"
import { ProjectApi } from "../types"

export const createProjectFn = async ({
  data,
}: {
  data: CreateProjectInput
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

  const { data: response } = await api.post<ProjectApi>(
    "/proyectos/",
    dataToSend,
  )

  return response
}

export const useCreateProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createProjectFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: projectsKeys.lists() })

      toast.success(`Proyecto ${data.nombre} creado con exito`)
    },
    onError: () => {
      toast.error("Error al crear")
    },
  })
}
