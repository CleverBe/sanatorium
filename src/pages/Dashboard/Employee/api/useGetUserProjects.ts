import { sleepApp } from "@/helpers/sleep"
import { mockedProjects } from "@/pages/Projects/api/useGetProjects"
import { employeeUsers } from "@/pages/Users/api/useGetUsers"
import { useQuery } from "@tanstack/react-query"
import { userUserProjectsKeys } from "./querykeys"

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
