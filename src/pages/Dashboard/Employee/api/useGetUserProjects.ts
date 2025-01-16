import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { userUserProjectsKeys } from "./querykeys"
import { EmployeeProjects, EmployeeProjectsApi } from "@/pages/Projects/types"
import { api } from "@/lib/axios"

export const getUserProjectsFn = async ({
  userId,
}: {
  userId: number
}): Promise<EmployeeProjects> => {
  const { data } = await api.get<EmployeeProjectsApi>(
    `/proyectos-asignados-empleado/${userId}/`,
  )

  return {
    manager: {
      id: data.empleado.id,
      name: data.empleado.nombre,
      email: data.empleado.email,
    },
    totalProjects: data.total_proyectos,
    projects: data.proyectos.map((project) => ({
      id: project.id,
      name: project.nombre,
      description: project.descripcion,
      status: project.estado,
      startDate: project.fecha_inicio,
      endDate: project.fecha_fin,
      inCharge: {
        id: project.encargado.id,
        name: project.encargado.nombre,
        email: project.encargado.email,
      },
      createdAt: project.created_at,
      updatedAt: project.updated_at,
    })),
  }
}

export const useGetUserProjects = ({
  userId,
  options,
}: {
  userId: number
  options?: Partial<UseQueryOptions<EmployeeProjects>>
}) => {
  return useQuery({
    queryKey: userUserProjectsKeys.list(userId),
    queryFn: () => getUserProjectsFn({ userId }),
    ...options,
  })
}
