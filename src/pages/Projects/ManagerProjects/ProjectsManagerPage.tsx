import { Button } from "@/components/ui/button"
import { SkeletonTable } from "@/components/SkeletonTable"
import { useGetCurrentUser } from "../../Profile/api/useGetCurrentUser"
import { useGetManagerProjects } from "../api/useGetManagerProjects"
import { ProjectsManagerTable } from "./components/ProjectsManagerTable"
import { ProjectManagerModal } from "./components/ProjectManagerModal"
import { useManagerProjectModal } from "./hooks/useManagerProjectModal"

export const ProjectsManagerPage = () => {
  const { data: user } = useGetCurrentUser()
  const { data: projects = [], isLoading: isLoadingProjects } =
    useGetManagerProjects({
      managerId: user?.id as number,
    })

  const isLoading = isLoadingProjects
  const modalProject = useManagerProjectModal()

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
          <ProjectsManagerTable projects={projects} />
        )}
      </div>
      <ProjectManagerModal />
    </div>
  )
}
