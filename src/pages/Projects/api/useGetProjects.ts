import { sleepApp } from "@/helpers/sleep"
import { useQuery } from "@tanstack/react-query"
import { projectsKeys } from "./querykeys"
import { Project } from "../types"
import { mockedProjects } from "@/db/db"

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
