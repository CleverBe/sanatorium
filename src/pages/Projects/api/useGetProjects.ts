import { useQuery } from "@tanstack/react-query"
import { projectsKeys } from "./querykeys"
import { Project, ProjectApi } from "../types"
import { api } from "@/lib/axios"

export const getProjectsFn = async (): Promise<Project[]> => {
  const { data } = await api.get<ProjectApi[]>("/proyectos")

  return data.map((project) => ({
    id: project.id,
    name: project.nombre,
    description: project.descripcion,
    status: project.estado,
    inCharge: project.encargado,
    startDate: project.fecha_inicio,
    endDate: project.fecha_fin,
    employees: project.empleados,
    createdAt: project.created_at,
    updatedAt: project.updated_at,
  }))
}

export const useGetProjects = () => {
  return useQuery({
    queryFn: getProjectsFn,
    queryKey: projectsKeys.lists(),
  })
}
