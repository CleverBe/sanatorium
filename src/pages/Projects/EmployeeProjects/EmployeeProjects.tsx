import { SkeletonTable } from "@/components/SkeletonTable"
import { useGetUserProjects } from "@/pages/Dashboard/Employee/api/useGetUserProjects"
import { useGetCurrentUser } from "@/pages/Profile/api/useGetCurrentUser"
import { EmployeeProjectsTable } from "./components/EmployeeProjectsTable"

export const EmployeeProjects = () => {
  const { data: user } = useGetCurrentUser()

  const { data, isLoading: isLoadingProjects } = useGetUserProjects({
    userId: user?.id as number,
    options: {
      enabled: !!user?.id,
    },
  })

  const projects = data?.projects || []

  const isLoading = isLoadingProjects

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold">Listado de proyectos</h1>
      </div>

      <div className="mt-4">
        {isLoading ? (
          <SkeletonTable withSearchInput />
        ) : (
          <EmployeeProjectsTable projects={projects} />
        )}
      </div>
    </div>
  )
}
