import { sleepApp } from "@/helpers/sleep"
import { managerUsers } from "@/pages/Users/api/useGetUsers"
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query"
import { userProfileKeys } from "./querykeys"
import { User } from "@/pages/Users/types"

export const getCurrentUserFn = async () => {
  return await sleepApp(1000).then(() => {
    return managerUsers[0]
  })
}

export const useGetCurrentUser = (
  options?: Partial<UseQueryOptions<User>>,
): UseQueryResult<User> => {
  return useQuery({
    queryKey: userProfileKeys.current,
    queryFn: getCurrentUserFn,
    ...options,
  })
}
