import { ProjectStatusEnum } from "@/pages/Projects/types"
import { RoleEnum } from "@/pages/Users/types"

export enum TaskStatusEnum {
  PENDING = "pendiente",
  IN_PROGRESS = "progreso",
  COMPLETED = "completada",
}

export interface Task {
  id: number
  title: string
  description: string
  status: TaskStatusEnum
  expectedCompletionDate: string
  estimatedHours: number
  project: {
    id: number
    name: string
    status: ProjectStatusEnum
    inCharge: {
      id: number
      name: string
      email: string
      role: RoleEnum
    }
  }
  user: {
    id: number
    name: string
    email: string
  }
  createdAt: string
  updatedAt: string
}

export interface TaskWithOrder extends Task {
  order: number
}

export interface TaskApi {
  id: number
  titulo: string
  descripcion: string
  proyecto: {
    id: number
    nombre: string
    descripcion: string
    estado: ProjectStatusEnum
    encargado: {
      id: number
      nombre: string
      email: string
      rol: RoleEnum
    }
  }
  fecha: string
  horas_invertidas: number
  empleado: {
    id: number
    nombre: string
    email: string
  }
  estado: TaskStatusEnum
  orden: number
  created_at: string
  updated_at: string
}

export interface TaskFromProjectApi {
  id: number
  titulo: string
  descripcion: string
  fecha: string
  horas_invertidas: number
  estado: TaskStatusEnum
  orden: number
  created_at: string
  updated_at: string
}

export interface ProjectWithTasksFromEmployeeResponseApi {
  proyecto: {
    id: number
    nombre: string
  }
  tareas: {
    pendiente: TaskFromProjectApi[]
    progreso: TaskFromProjectApi[]
    completada: TaskFromProjectApi[]
  }
}

export interface EmployeeTasksApi {
  empleado: {
    id: number
    nombre: string
    email: string
  }
  total_tareas: number
  proyectos: ProjectWithTasksFromEmployeeResponseApi[]
}

export interface EmployeeTasks {
  employee: {
    id: number
    name: string
    email: string
  }
  totalTasks: number
  tasks: {
    id: number
    title: string
    description: string
    status: TaskStatusEnum
    expectedCompletionDate: string
    estimatedHours: number
    project: {
      id: number
      name: string
    }
    order: number
    createdAt: string
    updatedAt: string
  }[]
}
