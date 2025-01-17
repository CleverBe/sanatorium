import { useGetCurrentUser } from "../Profile/api/useGetCurrentUser"
import { AdminReport } from "./Admin/AdminReport"
import { ManagerReport } from "./Manager/ManagerReport"
import { RoleEnum } from "../Users/types"

export const ReportsPage = () => {
  const { data: user } = useGetCurrentUser()

  if (user?.role === RoleEnum.ADMIN) {
    return <AdminReport />
  } else if (user?.role === RoleEnum.MANAGER) {
    return <ManagerReport user={user} />
  } else {
    return null
  }
}
