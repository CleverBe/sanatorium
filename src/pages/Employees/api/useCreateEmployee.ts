import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { CreateEmployeeInput } from "../schemas/EmployeeSchema"
import { employeesKeys } from "./querykeys"
import { api } from "@/lib/axios"
import { EmployeeApi } from "../types"

export const createEmployeeFn = async ({
  data,
}: {
  data: CreateEmployeeInput & { managerId: number }
}) => {
  const dataToSend = {
    nombre: data.name,
    email: data.email,
    password: data.password,
    encargado: data.managerId,
  }

  const { data: response } = await api.post<EmployeeApi>(
    "/registro-empleado/",
    dataToSend,
  )

  return response
}

export const useCreateEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createEmployeeFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: employeesKeys.all })

      toast.success(`Empleado ${data.nombre} creado con exito`)
    },
    onError: () => {
      toast.error("Error al crear")
    },
  })
}
