import { useQuery, UseQueryOptions } from "@tanstack/react-query"

import { userTasksKeys } from "./querykeys"
import { api } from "@/lib/axios"
import { EmployeeTasks, EmployeeTasksApi } from "@/pages/Tasks/types"

export const getUserTasksFn = async ({
  userId,
}: {
  userId: number
}): Promise<EmployeeTasks> => {
  const { data } = await api.get<EmployeeTasksApi>(
    `/tareas-empleado/${userId}/`,
  )

  const pendingTasks = data.proyectos.map((project) => ({
    tasks: project.tareas.pendiente.map((task) => ({
      id: task.id,
      title: task.titulo,
      description: task.descripcion,
      status: task.estado,
      expectedCompletionDate: task.fecha,
      estimatedHours: task.horas_invertidas,
      project: {
        id: project.proyecto.id,
        name: project.proyecto.nombre,
      },
      order: task.orden,
      createdAt: task.created_at,
      updatedAt: task.updated_at,
    })),
  }))

  const progressTasks = data.proyectos.map((project) => ({
    tasks: project.tareas.progreso.map((task) => ({
      id: task.id,
      title: task.titulo,
      description: task.descripcion,
      status: task.estado,
      expectedCompletionDate: task.fecha,
      estimatedHours: task.horas_invertidas,
      project: {
        id: project.proyecto.id,
        name: project.proyecto.nombre,
      },
      order: task.orden,
      createdAt: task.created_at,
      updatedAt: task.updated_at,
    })),
  }))

  const finishedTasks = data.proyectos.map((project) => ({
    tasks: project.tareas.completada.map((task) => ({
      id: task.id,
      title: task.titulo,
      description: task.descripcion,
      status: task.estado,
      expectedCompletionDate: task.fecha,
      estimatedHours: task.horas_invertidas,
      project: {
        id: project.proyecto.id,
        name: project.proyecto.nombre,
      },
      order: task.orden,
      createdAt: task.created_at,
      updatedAt: task.updated_at,
    })),
  }))

  const tasks = [...pendingTasks, ...progressTasks, ...finishedTasks].flatMap(
    (p) => p.tasks,
  )

  return {
    employee: {
      id: data.empleado.id,
      name: data.empleado.nombre,
      email: data.empleado.email,
    },
    totalTasks: data.total_tareas,
    tasks,
  }
}

export const useGetUserTasks = ({
  userId,
  options,
}: {
  userId: number
  options?: Partial<UseQueryOptions<EmployeeTasks>>
}) => {
  return useQuery({
    queryFn: () => getUserTasksFn({ userId }),
    queryKey: userTasksKeys.list(userId),
    ...options,
  })
}
