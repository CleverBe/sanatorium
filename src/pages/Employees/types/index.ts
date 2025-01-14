import { User, UserApi } from "@/pages/Users/types"

export type Employee = User

export type EmployeeApi = UserApi & { encargado: number }
