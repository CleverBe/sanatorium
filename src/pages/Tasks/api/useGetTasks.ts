import { sleepApp } from "@/helpers/sleep"
import { useQuery } from "@tanstack/react-query"
import { mockedTasks, Task } from "@/db/db"
import { tasksKeys } from "./querykeys"

export const getTasksFn = async (): Promise<Task[]> => {
  return sleepApp(1000).then(() => {
    return mockedTasks
  })
}

export const useGetTasks = () => {
  return useQuery({
    queryFn: getTasksFn,
    queryKey: tasksKeys.lists(),
  })
}
