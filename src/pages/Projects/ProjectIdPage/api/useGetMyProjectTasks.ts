import { sleepApp } from "@/helpers/sleep"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"

import { employeeUsers, mockedTasks, Task } from "@/db/db"
import { myProjectTasksKeys } from "./querykeys"

export const getMyProjectTasksFn = async ({
  projectId,
}: {
  projectId: string
}): Promise<Task[]> => {
  return sleepApp(1000).then(() => {
    return mockedTasks
      .filter((task) => task.projectId === projectId)
      .filter((task) => task.userId === employeeUsers[0].id)
  })
}

export const useGetMyProjectTasks = ({
  projectId,
  options,
}: {
  projectId: string
  options?: Partial<UseQueryOptions<Task[]>>
}) => {
  return useQuery({
    queryFn: () => getMyProjectTasksFn({ projectId }),
    queryKey: myProjectTasksKeys.detail(projectId),
    ...options,
  })
}
