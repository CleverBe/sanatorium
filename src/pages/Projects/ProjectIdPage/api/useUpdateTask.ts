import { sleepAppWithData } from "@/helpers/sleep"
import { UpdateTaskInput } from "../schemas/TaskSchema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { myProjectTasksKeys, userTasksKeys } from "./querykeys"

export type UpdateTaskApiInput = Partial<UpdateTaskInput> & {
  id: string
}

export const updateTaskFn = ({ data }: { data: UpdateTaskApiInput }) => {
  return sleepAppWithData(1000, data).then((data) => {
    return data
  })
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateTaskFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: userTasksKeys.all })
      queryClient.invalidateQueries({ queryKey: myProjectTasksKeys.all })

      toast.success(`Tarea ${data.title} actualizada con exito`)
    },
    onError: () => {
      toast.error("Error al crear")
    },
  })
}
