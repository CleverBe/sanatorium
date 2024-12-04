import { sleepApp } from "@/helpers/sleep"
import { useQuery } from "@tanstack/react-query"
import { projectsKeys } from "./querykeys"
import { ProjectStatusEnum, Project } from "../types"
import { mockedUsers } from "@/pages/Users/api/useGetUsers"

const mockedProjects: Project[] = [
  {
    id: "1",
    name: "Proyecto 1",
    description: "Descripcion 1",
    status: ProjectStatusEnum.PENDING,
    inCharge: mockedUsers[0].id,
    startDate: "2024-12-01T21:30:00.000Z",
    endDate: "2025-02-01T21:30:00.000Z",
    createdAt: "2022-01-01T21:30:00.000Z",
    updatedAt: "2022-01-01T21:30:00.000Z",
  },
  {
    id: "2",
    name: "Proyecto 2",
    description: "Descripcion 2",
    status: ProjectStatusEnum.IN_PROGRESS,
    inCharge: mockedUsers[0].id,
    startDate: "2024-12-01T21:30:00.000Z",
    endDate: "2025-02-10T21:30:00.000Z",
    createdAt: "2022-01-01T21:30:00.000Z",
    updatedAt: "2022-01-01T21:30:00.000Z",
  },
  {
    id: "3",
    name: "Proyecto 3",
    description: "Descripcion 3",
    status: ProjectStatusEnum.COMPLETED,
    inCharge: mockedUsers[1].id,
    startDate: "2024-11-01T21:30:00.000Z",
    endDate: "2025-12-01T21:30:00.000Z",
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
