import { useQuery } from "@tanstack/react-query"
import { tasksKeys } from "./querykeys"
import { api } from "@/lib/axios"
import { Task, TaskApi } from "../types"

export const getManagerEmployeesTasksFn = async ({
  managerId,
}: {
  managerId: number
}): Promise<Task[]> => {
  const { data } = await api.get<TaskApi[]>(
    `/tareas-empleados-encargado/${managerId}`,
  )

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
      description: task.proyecto.descripcion,
      startDate: task.proyecto.fecha_inicio,
      endDate: task.proyecto.fecha_fin,
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

export const useGetManagerEmployeesTasks = ({
  managerId,
}: {
  managerId: number
}) => {
  return useQuery({
    queryFn: () => getManagerEmployeesTasksFn({ managerId }),
    queryKey: tasksKeys.manager(managerId),
  })
}
