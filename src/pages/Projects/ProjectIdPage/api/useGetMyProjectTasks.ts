import { useQuery, UseQueryOptions } from "@tanstack/react-query"

import { TaskStatusEnum, TaskWithOrder } from "@/pages/Tasks/types"
import { api } from "@/lib/axios"
import { tasksKeys } from "@/pages/Tasks/api/querykeys"
import { ProjectStatusEnum } from "../../types"
import { RoleEnum } from "@/pages/Users/types"

interface TasksResponse {
  id: number
  titulo: string
  descripcion: string
  fecha: string
  horas_invertidas: number
  estado: TaskStatusEnum
  orden: number
  empleado: {
    id: number
    nombre: string
    email: string
  }
  proyecto: {
    id: number
    nombre: string
    descripcion: string
    estado: ProjectStatusEnum
    fecha_inicio: string
    fecha_fin: string
    encargado: {
      id: number
      nombre: string
      email: string
      rol: RoleEnum
    }
  }
  created_at: string
  updated_at: string
}

type Response = TasksResponse[]

export const getMyProjectTasksFn = async ({
  projectId,
  employeeId,
}: {
  projectId: number
  employeeId: number
}): Promise<TaskWithOrder[]> => {
  const { data } = await api.get<Response>(
    `/tareas-usuario-proyecto/${employeeId}/${projectId}/`,
  )

  return data.map((task) => ({
    id: task.id,
    title: task.titulo,
    description: task.descripcion,
    status: task.estado,
    estimatedHours: task.horas_invertidas,
    order: task.orden,
    project: {
      id: task.proyecto.id,
      name: task.proyecto.nombre,
      description: task.proyecto.descripcion,
      startDate: task.proyecto.fecha_inicio,
      endDate: task.proyecto.fecha_fin,
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
    expectedCompletionDate: task.fecha,
    createdAt: task.created_at,
    updatedAt: task.updated_at,
  }))
}

export const useGetMyProjectTasks = ({
  projectId,
  employeeId,
  options,
}: {
  projectId: number
  employeeId: number
  options?: Partial<UseQueryOptions<TaskWithOrder[]>>
}) => {
  return useQuery({
    queryFn: () => getMyProjectTasksFn({ projectId, employeeId }),
    queryKey: tasksKeys.projectAndEmployee(projectId, employeeId),
    ...options,
  })
}
