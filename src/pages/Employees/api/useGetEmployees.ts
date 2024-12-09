import { sleepApp } from "@/helpers/sleep"
import { employeeUsers } from "@/pages/Users/api/useGetUsers"
import { useQuery } from "@tanstack/react-query"
import { employeesKeys } from "./querykeys"
import { Employee } from "../types"

export const getEmployeesFn = async (): Promise<Employee[]> => {
  return sleepApp(1000).then(() => {
    return employeeUsers
  })
}

export const useGetEmployees = () => {
  return useQuery({
    queryFn: getEmployeesFn,
    queryKey: employeesKeys.lists(),
  })
}
