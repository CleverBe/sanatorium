import { sleepApp } from "@/helpers/sleep"
import { useQuery } from "@tanstack/react-query"
import { projectsKeys } from "./querykeys"
import { ProjectStatusEnum, Project } from "../types"
import { mockedUsers } from "@/pages/Users/api/useGetUsers"

export const mockedProjects: Project[] = [
  {
    id: "be83948f-4a5f-43f8-a0fd-fc94b471c4d8",
    name: "Proyecto 1",
    description: "Descripcion 1",
    status: ProjectStatusEnum.PENDING,
    inCharge: mockedUsers[0].id,
    startDate: "2024-12-01T21:30:00.000Z",
    endDate: "2025-02-01T21:30:00.000Z",
    employees: [mockedUsers[4].id, mockedUsers[5].id],
    createdAt: "2022-01-01T21:30:00.000Z",
    updatedAt: "2022-01-01T21:30:00.000Z",
  },
  {
    id: "fb406199-5c02-4409-bf33-1624367511f8",
    name: "Proyecto 2",
    description: "Descripcion 2",
    status: ProjectStatusEnum.IN_PROGRESS,
    inCharge: mockedUsers[0].id,
    startDate: "2024-12-01T21:30:00.000Z",
    endDate: "2025-02-10T21:30:00.000Z",
    employees: [mockedUsers[4].id],
    createdAt: "2022-01-01T21:30:00.000Z",
    updatedAt: "2022-01-01T21:30:00.000Z",
  },
  {
    id: "17e863dd-82eb-4f32-bf5c-e8b8b8bd9e9d",
    name: "Proyecto 3",
    description: "Descripcion 3",
    status: ProjectStatusEnum.COMPLETED,
    inCharge: mockedUsers[1].id,
    startDate: "2024-11-01T21:30:00.000Z",
    endDate: "2025-12-01T21:30:00.000Z",
    employees: [mockedUsers[5].id],
    createdAt: "2022-01-01T21:30:00.000Z",
    updatedAt: "2022-01-01T21:30:00.000Z",
  },
]

export const getProjectsFn = async (): Promise<Project[]> => {
  return sleepApp(1000).then(() => {
    return mockedProjects
  })
}

export const useGetProjects = () => {
  return useQuery({
    queryFn: getProjectsFn,
    queryKey: projectsKeys.lists(),
  })
}
