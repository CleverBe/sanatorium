import { useGetCurrentUser } from "../Profile/api/useGetCurrentUser"
import { RoleEnum } from "../Users/types"
import { DashboardAdmin } from "./Admin/DashboardAdmin"
import { DashboardEmployee } from "./Employee/DashboardEmployee"
import { DashboardManager } from "./Manager/DashboardManager"

export const Dashboard = () => {
  const { data: user } = useGetCurrentUser()

  return user?.role === RoleEnum.ADMIN ? (
    <DashboardAdmin />
  ) : user?.role === RoleEnum.MANAGER ? (
    <DashboardManager />
  ) : user?.role === RoleEnum.EMPLOYEE ? (
    <DashboardEmployee />
  ) : null
}
