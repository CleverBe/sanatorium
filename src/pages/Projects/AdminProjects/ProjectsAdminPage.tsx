import { useGetProjects } from "../api/useGetProjects"
import { useAdminProjectModal } from "./hooks/useAdminProjectModal"
import { Button } from "@/components/ui/button"
import { SkeletonTable } from "@/components/SkeletonTable"
import { AdminProjectsTable } from "./components/AdminProjectsTable"
import { ProjectAdminModal } from "./components/ProjectAdminModal"
import { useGetUsers } from "../../Users/api/useGetUsers"

export const ProjectsAdminPage = () => {
  const { data: projects = [], isLoading: isLoadingProjects } = useGetProjects()
  const { data: managers = [], isLoading: isLoadingUsers } = useGetUsers()
  const isLoading = isLoadingProjects || isLoadingUsers
  const modalProject = useAdminProjectModal()

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold">Administrar proyectos</h1>

        <Button
          onClick={() => {
            modalProject.onOpen()
          }}
          className="max-w-xs"
        >
          Agregar proyecto
        </Button>
      </div>

      <div className="mt-4">
        {isLoading ? (
          <SkeletonTable withSearchInput />
        ) : (
          <AdminProjectsTable projects={projects} managers={managers} />
        )}
      </div>
      <ProjectAdminModal />
    </div>
  )
}
