import { SkeletonTable } from "@/components/SkeletonTable"
import { useGetUserProjects } from "@/pages/Dashboard/Employee/api/useGetUserProjects"
import { useGetCurrentUser } from "@/pages/Profile/api/useGetCurrentUser"
import { EmployeeProjectsTable } from "./Components/EmployeeProjectsTable"
import { useGetUsers } from "@/pages/Users/api/useGetUsers"

export const EmployeeProjects = () => {
  const { data: user } = useGetCurrentUser()

  const { data: managers = [], isLoading: isLoadingUsers } = useGetUsers()

  const { data: projects = [], isLoading: isLoadingProjects } =
    useGetUserProjects({
      userId: user?.id as number,
      options: {
        enabled: !!user?.id,
      },
    })

  const isLoading = isLoadingProjects || isLoadingUsers

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold">Listado de proyectos</h1>
      </div>

      <div className="mt-4">
        {isLoading ? (
          <SkeletonTable withSearchInput />
        ) : (
          <EmployeeProjectsTable projects={projects} managers={managers} />
        )}
      </div>
    </div>
  )
}
