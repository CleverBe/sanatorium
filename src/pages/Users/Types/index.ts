export enum RoleEnum {
  ADMIN = "administrador",
  MANAGER = "encargado",
  EMPLOYEE = "empleado",
}

export interface UserApi {
  id: string
  nombre: string
  email: string
  rol: RoleEnum
  image?: string
}

export interface User {
  id: string
  name: string
  email: string
  role: RoleEnum
  image?: string
}
