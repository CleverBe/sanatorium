import { useQuery } from "@tanstack/react-query"
import { projectsKeys } from "./querykeys"
import { ManagerProjects, ManagerProjectsApi } from "../types"
import { api } from "@/lib/axios"

export const getManagerProjectsFn = async ({
  managerId,
}: {
  managerId: number
}): Promise<ManagerProjects> => {
  const { data } = await api.get<ManagerProjectsApi>(
    `proyectos-por-encargado/${managerId}`,
  )

  return {
    manager: {
      id: data.encargado.id,
      name: data.encargado.nombre,
      email: data.encargado.email,
    },
    totalProjects: data.total_proyectos,
    projects: data.proyectos.map((project) => ({
      id: project.id,
      name: project.nombre,
      description: project.descripcion,
      status: project.estado,
      startDate: project.fecha_inicio,
      endDate: project.fecha_fin,
      employees: project.empleados.map((employee) => employee.id),
      createdAt: project.created_at,
      updatedAt: project.updated_at,
    })),
  }
}

export const useGetManagerProjects = ({ managerId }: { managerId: number }) => {
  return useQuery({
    queryFn: () => getManagerProjectsFn({ managerId }),
    queryKey: projectsKeys.lists(),
  })
}
