import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { api } from "@/lib/axios"
import { TaskApi, TaskStatusEnum } from "@/pages/Tasks/types"
import { tasksKeys } from "@/pages/Tasks/api/querykeys"

export const moveTaskFn = async ({
  id,
  newStatus,
  newOrder,
}: {
  id: number
  newStatus: TaskStatusEnum
  newOrder: number
}) => {
  const dataToSend = {
    id: id,
    nuevo_estado: newStatus,
    nuevo_orden: newOrder,
  }

  const { data: response } = await api.post<TaskApi>(
    `/tareas/actualizar/`,
    dataToSend,
  )

  return response
}

export const useMoveTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: moveTaskFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tasksKeys.all })

      toast.success(`Tarea movida con exito`)
    },
    onError: () => {
      toast.error("Error al mover")
    },
  })
}
