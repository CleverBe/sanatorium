import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { UpdateEmployeeInput } from "../schemas/EmployeeSchema"
import { employeesKeys } from "./querykeys"
import { api } from "@/lib/axios"
import { EmployeeApi } from "../types"

export type UpdateEmployeeApiInput = Partial<UpdateEmployeeInput> & {
  id: number
}

export const updateEmployeeFn = async ({
  data,
}: {
  data: UpdateEmployeeApiInput
}) => {
  const dataToSend = {
    nombre: data.name,
    email: data.email,
    password: data.password,
  }

  const { data: response } = await api.patch<EmployeeApi>(
    "/usuarios",
    dataToSend,
  )

  return response
}

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateEmployeeFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: employeesKeys.lists() })

      toast.success(`Empleado ${data.nombre} actualizado con exito`)
    },
    onError: () => {
      toast.error("Error al actualizar")
    },
  })
}
