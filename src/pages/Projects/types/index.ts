import { RoleEnum, UserApi } from "@/pages/Users/types"

export enum ProjectStatusEnum {
  PENDING = "pendiente",
  IN_PROGRESS = "progreso",
  COMPLETED = "completado",
}

export interface Project {
  id: number
  name: string
  description: string
  status: ProjectStatusEnum
  inCharge: number
  startDate: string
  endDate: string
  employees: number[]
  createdAt: string
  updatedAt: string
}

export interface ProjectApi {
  id: number
  nombre: string
  descripcion: string
  fecha_inicio: string
  fecha_fin: string
  estado: ProjectStatusEnum
  empleados: number[]
  encargado: number
  created_at: string
  updated_at: string
}

interface ProyectoFromManagerProjectApi
  extends Omit<ProjectApi, "encargado" | "empleados"> {
  empleados: UserApi[]
}

export interface ManagerProjectsApi {
  encargado: {
    id: number
    nombre: string
    email: string
  }
  total_proyectos: number
  proyectos: ProyectoFromManagerProjectApi[]
}

export type ProjectWithoutInCharge = Omit<Project, "inCharge">

export interface ManagerProjects {
  manager: {
    id: number
    name: string
    email: string
  }
  totalProjects: number
  projects: ProjectWithoutInCharge[]
}

export interface EmployeeProjectsApi {
  empleado: {
    id: number
    nombre: string
    email: string
  }
  total_proyectos: number
  proyectos: {
    id: number
    nombre: string
    descripcion: string
    fecha_inicio: string
    fecha_fin: string
    estado: ProjectStatusEnum
    encargado: {
      id: number
      nombre: string
      email: string
      rol: RoleEnum
    }
    created_at: string
    updated_at: string
  }[]
}

export interface ProjectWithoutEmployees
  extends Omit<Project, "employees" | "inCharge"> {
  inCharge: {
    id: number
    name: string
    email: string
  }
}

export interface EmployeeProjects {
  manager: {
    id: number
    name: string
    email: string
  }
  totalProjects: number
  projects: ProjectWithoutEmployees[]
}
