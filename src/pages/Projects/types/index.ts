export enum ProjectStatusEnum {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export interface Project {
  id: string
  name: string
  description: string
  status: ProjectStatusEnum
  inCharge: string
  startDate: string
  endDate: string
  employees: string[]
  createdAt: string
  updatedAt: string
}
