import { useMutation, useQueryClient } from "@tanstack/react-query"
import { employeesKeys } from "./querykeys"
import { toast } from "sonner"
import { api } from "@/lib/axios"

export const deleteEmployeeFn = async ({ id }: { id: number }) => {
  const { data: response } = await api.delete(`/usuarios/${id}`)

  return response
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
