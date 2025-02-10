import { useGetCurrentUser } from "../Profile/api/useGetCurrentUser"
import { AdminReport } from "./Admin/AdminReport"
import { ManagerReport } from "./Manager/ManagerReport"
import { RoleEnum } from "../Users/types"
import { FilterProvider } from "./context/FiltersContext"

export const ReportsPage = () => {
  const { data: user } = useGetCurrentUser()

  return (
    <FilterProvider>
      {user?.role === RoleEnum.ADMIN ? (
        <AdminReport />
      ) : user?.role === RoleEnum.MANAGER ? (
        <ManagerReport user={user} />
      ) : null}
    </FilterProvider>
  )
}
