import { useQuery, UseQueryOptions } from "@tanstack/react-query"

import { userTasksKeys } from "./querykeys"
import { api } from "@/lib/axios"
import { Task, TaskApi } from "@/pages/Tasks/types"

export const getUserTasksFn = async ({
  userId,
}: {
  userId: number
}): Promise<Task[]> => {
  const { data } = await api.get<TaskApi[]>(`/tareas-empleado/${userId}`)

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

export const useGetUserTasks = ({
  userId,
  options,
}: {
  userId: number
  options?: Partial<UseQueryOptions<Task[]>>
}) => {
  return useQuery({
    queryFn: () => getUserTasksFn({ userId }),
    queryKey: userTasksKeys.list(userId),
    ...options,
  })
}
