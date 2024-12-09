export enum RoleEnum {
  ADMIN = "Administrador",
  MANAGER = "Gerente",
  EMPLOYEE = "Empleado",
}

export interface User {
  id: string
  firstname: string
  lastname: string
  email: string
  status: boolean
  role: RoleEnum
  image: string
}
