import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { userUserProjectsKeys } from "./querykeys"
import { Project, ProjectApi } from "@/pages/Projects/types"
import { api } from "@/lib/axios"

export const getUserProjectsFn = async ({ userId }: { userId: number }) => {
  const { data } = await api.get<ProjectApi[]>(
    `/proyectos-asignados-empleado/${userId}/`,
  )

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

export const useGetUserProjects = ({
  userId,
  options,
}: {
  userId: number
  options?: Partial<UseQueryOptions<Project[]>>
}) => {
  return useQuery({
    queryKey: userUserProjectsKeys.list(userId),
    queryFn: () => getUserProjectsFn({ userId }),
    ...options,
  })
}
