import { UpdateTaskInput } from "../schemas/TaskSchema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { myProjectTasksKeys, userTasksKeys } from "./querykeys"
import { api } from "@/lib/axios"
import { TaskApi } from "@/pages/Tasks/types"

export type UpdateTaskApiInput = Partial<UpdateTaskInput> & {
  id: number
}

export const updateTaskFn = async ({
  data,
}: {
  data: UpdateTaskApiInput & { projectId: number }
}) => {
  const dataToSend = {
    titulo: data.title,
    descripcion: data.description,
    proyecto: data.projectId,
    fecha: data.expectedCompletionDate,
    horas_invertidas: data.estimatedHours,
    // "empleado": data, // TODO:
  }

  const { data: response } = await api.post<TaskApi>("/tareas/", dataToSend)

  return response
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateTaskFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: userTasksKeys.all })
      queryClient.invalidateQueries({ queryKey: myProjectTasksKeys.all })

      toast.success(`Tarea ${data.titulo} actualizada con exito`)
    },
    onError: () => {
      toast.error("Error al crear")
    },
  })
}
