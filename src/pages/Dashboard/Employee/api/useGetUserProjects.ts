import { sleepApp } from "@/helpers/sleep"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { userUserProjectsKeys } from "./querykeys"
import { mockedProjects } from "@/db/db"
import { Project } from "@/pages/Projects/types"

export const getUserProjectsFn = async ({ userId }: { userId: string }) => {
  return await sleepApp(1000).then(() => {
    return mockedProjects.filter((project) =>
      project.employees.includes(userId),
    )
  })
}

export const useGetUserProjects = ({
  userId,
  options,
}: {
  userId: string
  options?: Partial<UseQueryOptions<Project[]>>
}) => {
  return useQuery({
    queryKey: userUserProjectsKeys.list(userId),
    queryFn: () => getUserProjectsFn({ userId }),
    ...options,
  })
}
