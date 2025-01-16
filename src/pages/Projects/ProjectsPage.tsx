import { useGetCurrentUser } from "../Profile/api/useGetCurrentUser"
import { RoleEnum } from "../Users/types"
import { ProjectsAdminPage } from "./AdminProjects/ProjectsAdminPage"
import { ProjectsManagerPage } from "./ManagerProjects/ProjectsManagerPage"

export const ProjectsPage = () => {
  const { data: user } = useGetCurrentUser()

  return user?.role === RoleEnum.ADMIN ? (
    <ProjectsAdminPage />
  ) : user?.role === RoleEnum.MANAGER ? (
    <ProjectsManagerPage />
  ) : null
}
