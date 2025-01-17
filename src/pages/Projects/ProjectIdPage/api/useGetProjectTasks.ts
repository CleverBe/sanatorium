import { useQuery, UseQueryOptions } from "@tanstack/react-query"

import { TaskStatusEnum, TaskWithOrder } from "@/pages/Tasks/types"
import { api } from "@/lib/axios"
import { ProjectStatusEnum } from "../../types"
import { RoleEnum } from "@/pages/Users/types"
import { tasksKeys } from "@/pages/Tasks/api/querykeys"

interface Response {
  proyecto: {
    id: number
    nombre: string
    descripcion: string
    estado: ProjectStatusEnum
    encargado: {
      id: number
      nombre: string
      email: string
      rol: RoleEnum
    }
  }
  total_tareas: number
  tareas: {
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
    created_at: string
    updated_at: string
  }[]
}

export const getProjectTasksFn = async ({
  projectId,
}: {
  projectId: number
}): Promise<TaskWithOrder[]> => {
  const { data } = await api.get<Response>(`/tareas-proyecto/${projectId}/`)

  return data.tareas.map((task) => ({
    id: task.id,
    title: task.titulo,
    description: task.descripcion,
    status: task.estado,
    estimatedHours: task.horas_invertidas,
    order: task.orden,
    project: {
      id: data.proyecto.id,
      name: data.proyecto.nombre,
      inCharge: {
        id: data.proyecto.encargado.id,
        name: data.proyecto.encargado.nombre,
        email: data.proyecto.encargado.email,
        role: data.proyecto.encargado.rol,
      },
      status: data.proyecto.estado,
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

export const useGetProjectTasks = ({
  projectId,
  options,
}: {
  projectId: number
  options?: Partial<UseQueryOptions<TaskWithOrder[]>>
}) => {
  return useQuery({
    queryFn: () => getProjectTasksFn({ projectId }),
    queryKey: tasksKeys.project(projectId),
    ...options,
  })
}
