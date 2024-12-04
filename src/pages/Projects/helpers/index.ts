import { ProjectStatusEnum } from "../types"

export const getProjectStatus = (status: ProjectStatusEnum) => {
  switch (status) {
    case "PENDING":
      return "Pendiente"
    case "IN_PROGRESS":
      return "En progreso"
    case "COMPLETED":
      return "Completado"
    default:
      return ""
  }
}
