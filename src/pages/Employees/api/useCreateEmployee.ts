import { sleepAppWithData } from "@/helpers/sleep"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { CreateEmployeeInput } from "../schemas/EmployeeSchema"
import { employeesKeys } from "./querykeys"

export const createEmployeeFn = ({ data }: { data: CreateEmployeeInput }) => {
  return sleepAppWithData(1000, data).then((data) => {
    return data
  })
}

export const useCreateEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createEmployeeFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: employeesKeys.lists() })

      toast.success(
        `Empleado ${data.firstname} ${data.lastname} creado con exito`,
      )
    },
    onError: () => {
      toast.error("Error al crear")
    },
  })
}
