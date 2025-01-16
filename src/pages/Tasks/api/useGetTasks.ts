import { useQuery } from "@tanstack/react-query"
import { tasksKeys } from "./querykeys"
import { api } from "@/lib/axios"
import { Task, TaskApi } from "../types"

export const getTasksFn = async (): Promise<Task[]> => {
  const { data } = await api.get<TaskApi[]>("/tareas/")

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

export const useGetTasks = () => {
  return useQuery({
    queryFn: getTasksFn,
    queryKey: tasksKeys.lists(),
  })
}
