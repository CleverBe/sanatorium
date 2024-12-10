import { sleepApp } from "@/helpers/sleep"
import { useQuery } from "@tanstack/react-query"
import { userUserProjectsKeys } from "./querykeys"
import { employeeUsers, mockedProjects } from "@/db/db"

export const getUserProjectsFn = async () => {
  return await sleepApp(1000).then(() => {
    return mockedProjects.filter((project) =>
      project.employees.includes(employeeUsers[0].id),
    )
  })
}

export const useGetUserProjects = () => {
  return useQuery({
    queryKey: userUserProjectsKeys.all(),
    queryFn: getUserProjectsFn,
  })
}
