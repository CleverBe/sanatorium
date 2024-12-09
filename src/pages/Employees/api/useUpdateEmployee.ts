import { sleepAppWithData } from "@/helpers/sleep"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { UpdateEmployeeInput } from "../schemas/EmployeeSchema"
import { employeesKeys } from "./querykeys"

export type UpdateEmployeeApiInput = Partial<UpdateEmployeeInput> & {
  id: string
}

export const updateEmployeeFn = ({
  data,
}: {
  data: UpdateEmployeeApiInput
}) => {
  return sleepAppWithData(1000, data).then((data) => {
    return data
  })
}

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateEmployeeFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: employeesKeys.lists() })

      toast.success(
        `Empleado ${data.firstname} ${data.lastname} actualizado con exito`,
      )
    },
    onError: () => {
      toast.error("Error al actualizar")
    },
  })
}
