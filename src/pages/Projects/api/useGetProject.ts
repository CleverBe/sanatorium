import { sleepApp } from "@/helpers/sleep"
import { useQuery } from "@tanstack/react-query"
import { projectsKeys } from "./querykeys"
import { Project } from "../types"
import { mockedProjects } from "@/db/db"

export const getProjectFn = async ({
  projectId,
}: {
  projectId: string
}): Promise<Project> => {
  return sleepApp(1000).then(() => {
    const project = mockedProjects.find((project) => project.id === projectId)

    if (!project) {
      throw new Error("Project not found")
    }

    return project
  })
}

export const useGetProject = ({ projectId }: { projectId: string }) => {
  return useQuery({
    queryFn: () => getProjectFn({ projectId }),
    queryKey: projectsKeys.lists(),
  })
}
