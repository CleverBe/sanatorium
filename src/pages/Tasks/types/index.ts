import { Project } from "@/pages/Projects/types"
import { User } from "@/pages/Users/types"

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
  project: Project
  user: User
  createdAt: string
  updatedAt: string
}

export interface TaskApi {
  id: number
  titulo: string
  descripcion: string
  proyecto: number
  fecha: string
  horas_invertidas: number
  empleado: number
  archivo: string
  estado: TaskStatusEnum
  orden: number
  created_at: string
  updated_at: string
}
