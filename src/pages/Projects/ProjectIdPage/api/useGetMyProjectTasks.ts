import { useQuery, UseQueryOptions } from "@tanstack/react-query"

import { myProjectTasksKeys } from "./querykeys"
import { Task, TaskApi } from "@/pages/Tasks/types"
import { api } from "@/lib/axios"

export const getMyProjectTasksFn = async ({
  projectId,
}: {
  projectId: string
}): Promise<Task[]> => {
  const { data } = await api.get<TaskApi[]>(`/tareas-proyecto/${projectId}/`)

  return data.map((task) => ({
    id: task.id,
    title: task.titulo,
    description: task.descripcion,
    status: task.estado,
    expectedCompletionDate: task.fecha,
    estimatedHours: task.horas_invertidas,
    project: task.proyecto,
    user: task.empleado,
    createdAt: task.created_at,
    updatedAt: task.updated_at,
  }))
}

export const useGetMyProjectTasks = ({
  projectId,
  options,
}: {
  projectId: string
  options?: Partial<UseQueryOptions<Task[]>>
}) => {
  return useQuery({
    queryFn: () => getMyProjectTasksFn({ projectId }),
    queryKey: myProjectTasksKeys.detail(projectId),
    ...options,
  })
}
