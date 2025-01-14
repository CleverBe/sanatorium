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
