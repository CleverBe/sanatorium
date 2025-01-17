import { useQuery, UseQueryOptions } from "@tanstack/react-query"

import { api } from "@/lib/axios"
import { Task, TaskApi } from "@/pages/Tasks/types"
import { tasksKeys } from "@/pages/Tasks/api/querykeys"

export const getUserTasksFn = async ({
  userId,
}: {
  userId: number
}): Promise<Task[]> => {
  const { data } = await api.get<TaskApi[]>(`/tareas-empleado/${userId}/`)

  return data.map((task) => ({
    id: task.id,
    title: task.titulo,
    description: task.descripcion,
    status: task.estado,
    estimatedHours: task.horas_invertidas,
    expectedCompletionDate: task.fecha,
    createdAt: task.created_at,
    updatedAt: task.updated_at,
    project: {
      id: task.proyecto.id,
      name: task.proyecto.nombre,
      inCharge: {
        id: task.proyecto.encargado.id,
        name: task.proyecto.encargado.nombre,
        email: task.proyecto.encargado.email,
        role: task.proyecto.encargado.rol,
      },
      status: task.proyecto.estado,
    },
    user: {
      id: task.empleado.id,
      name: task.empleado.nombre,
      email: task.empleado.email,
    },
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
    queryKey: tasksKeys.employee(userId),
    ...options,
  })
}
