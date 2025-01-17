import { useQuery } from "@tanstack/react-query"
import { projectsKeys } from "./querykeys"
import { ManagerProjectsApi, ProjectWithoutInCharge } from "../types"
import { api } from "@/lib/axios"

export const getManagerProjectsFn = async ({
  managerId,
}: {
  managerId: number
}): Promise<ProjectWithoutInCharge[]> => {
  const { data } = await api.get<ManagerProjectsApi>(
    `proyectos-por-encargado/${managerId}`,
  )

  return data.proyectos.map((project) => ({
    id: project.id,
    name: project.nombre,
    description: project.descripcion,
    status: project.estado,
    startDate: project.fecha_inicio,
    endDate: project.fecha_fin,
    employees: project.empleados.map((employee) => employee.id),
    createdAt: project.created_at,
    updatedAt: project.updated_at,
  }))
}

export const useGetManagerProjects = ({ managerId }: { managerId: number }) => {
  return useQuery({
    queryFn: () => getManagerProjectsFn({ managerId }),
    queryKey: projectsKeys.manager(managerId),
  })
}
