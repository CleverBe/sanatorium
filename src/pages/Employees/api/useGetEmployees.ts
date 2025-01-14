import { useQuery } from "@tanstack/react-query"
import { employeesKeys } from "./querykeys"
import { Employee, EmployeeApi } from "../types"
import { api } from "@/lib/axios"

export const getEmployeesFn = async ({
  encargadoId,
}: {
  encargadoId: number
}): Promise<Employee[]> => {
  const { data } = await api.get<EmployeeApi[]>(
    `/empleados-por-encargado/${encargadoId}`,
  )

  return data.map((user) => ({
    id: user.id,
    name: user.nombre,
    email: user.email,
    role: user.rol,
    image: user.image,
  }))
}

export const useGetEmployees = ({ encargadoId }: { encargadoId: number }) => {
  return useQuery({
    queryFn: () => getEmployeesFn({ encargadoId }),
    queryKey: employeesKeys.lists(),
  })
}
