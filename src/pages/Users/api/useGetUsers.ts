import { sleepApp } from "@/helpers/sleep"
import { useQuery } from "@tanstack/react-query"
import { usersKeys } from "./querykeys"
import { User } from "../types"
import { mockedUsers } from "@/db/db"

export const getUsersFn = async (): Promise<User[]> => {
  return sleepApp(1000).then(() => {
    return mockedUsers
  })
}

export const useGetUsers = () => {
  return useQuery({
    queryFn: getUsersFn,
    queryKey: usersKeys.lists(),
  })
}
