import { CreateTaskInput } from "../schemas/TaskSchema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { myProjectTasksKeys, userTasksKeys } from "./querykeys"
import { TaskApi } from "@/pages/Tasks/types"
import { api } from "@/lib/axios"

export const createTaskFn = async ({
  data,
}: {
  data: CreateTaskInput & { projectId: number }
}) => {
  const dataToSend = {
    titulo: data.title,
    descripcion: data.description,
    proyecto: data.projectId,
    fecha: data.expectedCompletionDate,
    horas_invertidas: data.estimatedHours,
    // "empleado": data, // TODO:
  }

  const { data: response } = await api.post<TaskApi>("/tareas", dataToSend)

  return response
}

export const useCreateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTaskFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: userTasksKeys.all })
      queryClient.invalidateQueries({ queryKey: myProjectTasksKeys.all })

      toast.success(`Tarea ${data.titulo} creada con exito`)
    },
    onError: () => {
      toast.error("Error al crear")
    },
  })
}
