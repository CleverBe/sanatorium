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
    project: {
      id: task.proyecto.id,
      name: task.proyecto.nombre,
      status: task.proyecto.estado,
      inCharge: {
        id: task.proyecto.encargado.id,
        name: task.proyecto.encargado.nombre,
        email: task.proyecto.encargado.email,
        role: task.proyecto.encargado.rol,
      },
    },
    user: {
      id: task.empleado.id,
      name: task.empleado.nombre,
      email: task.empleado.email,
    },
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
