import { ProjectStatusEnum } from "../types"

export const getProjectStatus = (status: ProjectStatusEnum) => {
  switch (status) {
    case "pendiente":
      return "Pendiente"
    case "progreso":
      return "En progreso"
    case "completado":
      return "Completado"
    default:
      return ""
  }
}

export const getTaskStatus = (status: string) => {
  switch (status) {
    case "pendiente":
      return "Pendiente"
    case "progreso":
      return "En progreso"
    case "completada":
      return "Completado"
    default:
      return ""
  }
}
