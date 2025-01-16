import { useQuery } from "@tanstack/react-query"
import { employeesKeys } from "./querykeys"
import { ManagerEmployees, ManagerEmployeesApi } from "../types"
import { api } from "@/lib/axios"

export const getManagerEmployeesFn = async ({
  encargadoId,
}: {
  encargadoId: number
}): Promise<ManagerEmployees> => {
  const { data } = await api.get<ManagerEmployeesApi>(
    `/empleados-por-encargado/${encargadoId}`,
  )

  return {
    manager: {
      id: data.encargado.id,
      name: data.encargado.nombre,
      email: data.encargado.email,
    },
    totalEmployees: data.total_empleados,
    employees: data.empleados.map((employee) => ({
      id: employee.id,
      name: employee.nombre,
      email: employee.email,
      role: employee.rol,
      image: employee.image,
    })),
  }
}

export const useGetManagerEmployees = ({
  encargadoId,
}: {
  encargadoId: number
}) => {
  return useQuery({
    queryFn: () => getManagerEmployeesFn({ encargadoId }),
    queryKey: employeesKeys.manager(encargadoId),
  })
}
