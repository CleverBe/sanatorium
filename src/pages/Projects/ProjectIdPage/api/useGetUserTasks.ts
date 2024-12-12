import { sleepApp } from "@/helpers/sleep"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"

import { mockedTasks, Task } from "@/db/db"
import { userTasksKeys } from "./querykeys"

export const getUserTasksFn = async (): Promise<Task[]> => {
  return sleepApp(1000).then(() => {
    return mockedTasks
  })
}

export const useGetUserTasks = ({
  userId,
  options,
}: {
  userId: string
  options?: Partial<UseQueryOptions<Task[]>>
}) => {
  return useQuery({
    queryFn: () => getUserTasksFn(),
    queryKey: userTasksKeys.list(userId),
    ...options,
  })
}
