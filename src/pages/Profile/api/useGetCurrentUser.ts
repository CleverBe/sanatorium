import { sleepApp } from "@/helpers/sleep"
import { managerUsers } from "@/pages/Users/api/useGetUsers"
import { useQuery } from "@tanstack/react-query"
import { userProfileKeys } from "./querykeys"

export const getCurrentUserFn = async () => {
  return await sleepApp(1000).then(() => {
    return managerUsers[0]
  })
}

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: userProfileKeys.current,
    queryFn: getCurrentUserFn,
  })
}
