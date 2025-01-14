export enum RoleEnum {
  ADMIN = "administrador",
  MANAGER = "encargado",
  EMPLOYEE = "empleado",
}

export interface UserApi {
  id: number
  nombre: string
  email: string
  rol: RoleEnum
  image?: string
}

export interface User {
  id: number
  name: string
  email: string
  role: RoleEnum
  image?: string
}
