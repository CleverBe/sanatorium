import { sleepApp } from "@/helpers/sleep"
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query"
import { userProfileKeys } from "./querykeys"
import { User } from "@/pages/Users/types"
import { managerUsers } from "@/db/db"

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
