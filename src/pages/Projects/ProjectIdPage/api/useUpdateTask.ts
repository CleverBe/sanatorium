import { UpdateTaskInput } from "../schemas/TaskSchema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { api } from "@/lib/axios"
import { TaskApi } from "@/pages/Tasks/types"
import { tasksKeys } from "@/pages/Tasks/api/querykeys"

export type UpdateTaskApiInput = Partial<UpdateTaskInput> & {
  id: number
}

export const updateTaskFn = async ({
  data,
}: {
  data: Omit<UpdateTaskApiInput, "estimatedHours"> & {
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
    empleado_id: data.userId,
    archivo: "",
  }

  const { data: response } = await api.put<TaskApi>(
    `/tareas/${data.id}/`,
    dataToSend,
  )

  return response
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateTaskFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: tasksKeys.all })

      toast.success(`Tarea ${data.titulo} actualizada con exito`)
    },
    onError: () => {
      toast.error("Error al actualizar")
    },
  })
}
