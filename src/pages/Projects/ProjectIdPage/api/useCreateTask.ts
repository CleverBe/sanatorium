import { CreateTaskInput } from "../schemas/TaskSchema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { TaskApi } from "@/pages/Tasks/types"
import { api } from "@/lib/axios"
import { tasksKeys } from "@/pages/Tasks/api/querykeys"

export const createTaskFn = async ({
  data,
}: {
  data: Omit<CreateTaskInput, "estimatedHours"> & {
    projectId: number
    userId: number
    estimatedHours: number
  }
}) => {
  const dataToSend = {
    titulo: data.title,
    descripcion: data.description,
    proyecto: data.projectId,
    fecha: data.expectedCompletionDate,
    horas_invertidas: data.estimatedHours,
    empleado: data.userId,
  }

  const { data: response } = await api.post<TaskApi>("/tareas/", dataToSend)

  return response
}

export const useCreateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTaskFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: tasksKeys.all })

      toast.success(`Tarea ${data.titulo} creada con exito`)
    },
    onError: () => {
      toast.error("Error al crear")
    },
  })
}
