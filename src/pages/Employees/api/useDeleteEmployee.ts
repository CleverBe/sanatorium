import { sleepAppWithData } from "@/helpers/sleep"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { employeesKeys } from "./querykeys"
import { toast } from "sonner"

export const deleteEmployeeFn = ({ id }: { id: string }) => {
  return sleepAppWithData(1000, id).then((id) => {
    return { id }
  })
}

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteEmployeeFn,
    onSuccess: (data) => {
      queryClient.removeQueries({
        queryKey: employeesKeys.list(data.id),
        exact: true,
      })

      queryClient.invalidateQueries({ queryKey: employeesKeys.lists() })

      toast.success(`Eliminado con exito`)
    },
    onError: () => {
      toast.error("Error al eliminar")
    },
  })
}
