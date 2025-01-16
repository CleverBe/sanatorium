import { User, UserApi } from "@/pages/Users/types"

export type Employee = User

export type EmployeeApi = UserApi & { encargado: number }

export interface ManagerEmployeesApi {
  encargado: {
    id: number
    nombre: string
    email: string
  }
  total_empleados: number
  empleados: UserApi[]
}

export interface ManagerEmployees {
  manager: {
    id: number
    name: string
    email: string
  }
  totalEmployees: number
  employees: User[]
}
