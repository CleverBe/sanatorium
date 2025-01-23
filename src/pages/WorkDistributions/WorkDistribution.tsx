import { useGetCurrentUser } from "../Profile/api/useGetCurrentUser"
import { RoleEnum } from "../Users/types"
import { AdminWorkDistribution } from "./Admin/AdminWorkDistribution"
import { ManagerWorkDistribution } from "./Manager/ManagerWorkDistribution"

export const WorkDistribution = () => {
  const { data: user } = useGetCurrentUser()

  if (user?.role === RoleEnum.ADMIN) {
    return <AdminWorkDistribution />
  } else if (user?.role === RoleEnum.MANAGER) {
    return <ManagerWorkDistribution />
  } else {
    return null
  }
}
