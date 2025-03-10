import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { projectsKeys } from "./querykeys"
import { Project, ProjectApi } from "../types"
import { api } from "@/lib/axios"

export const getProjectFn = async ({
  projectId,
}: {
  projectId: number
}): Promise<Project> => {
  const { data } = await api.get<ProjectApi>(`/proyectos/${projectId}/`)

  return {
    id: data.id,
    name: data.nombre,
    description: data.descripcion,
    status: data.estado,
    inCharge: data.encargado,
    startDate: data.fecha_inicio,
    endDate: data.fecha_fin,
    employees: data.empleados,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  }
}

export const useGetProject = ({
  projectId,
  options,
}: {
  projectId: number
  options?: Partial<UseQueryOptions<Project>>
}) => {
  return useQuery({
    queryFn: () => getProjectFn({ projectId }),
    queryKey: projectsKeys.list(projectId),
    ...options,
  })
}
