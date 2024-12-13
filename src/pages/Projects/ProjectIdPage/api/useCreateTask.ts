import { sleepAppWithData } from "@/helpers/sleep"
import { CreateTaskInput } from "../schemas/TaskSchema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { myProjectTasksKeys, userTasksKeys } from "./querykeys"

export const createTaskFn = ({ data }: { data: CreateTaskInput }) => {
  return sleepAppWithData(1000, data).then((data) => {
    return data
  })
}

export const useCreateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTaskFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: userTasksKeys.all })
      queryClient.invalidateQueries({ queryKey: myProjectTasksKeys.all })

      toast.success(`Tarea ${data.title} creada con exito`)
    },
    onError: () => {
      toast.error("Error al crear")
    },
  })
}
