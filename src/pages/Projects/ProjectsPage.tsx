import { Input } from "@/components/ui/input"
import { useGetProjects } from "./api/useGetProjects"
import { useProjectModal } from "./hooks/useProjectModal"
import { Button } from "@/components/ui/button"
import { SkeletonTable } from "@/components/SkeletonTable"
import { ProjectsTable } from "./components/ProjectsTable"
import { ProjectModal } from "./components/ProjectModal"
import { useGetUsers } from "../Users/api/useGetUsers"

export const ProjectsPage = () => {
  const { data: projects = [], isLoading: isLoadingProjects } = useGetProjects()
  const { data: users = [], isLoading: isLoadingUsers } = useGetUsers()
  const isLoading = isLoadingProjects || isLoadingUsers
  const modalProject = useProjectModal()

  return (
    <div>
      <h1 className="text-2xl font-bold">Administrar proyectos</h1>

      <div className="mt-4 flex justify-between">
        <Input type="text" placeholder="Buscar..." className="max-w-xs" />

        <Button
          onClick={() => {
            modalProject.onOpen()
          }}
        >
          Agregar
        </Button>
      </div>

      <div className="mt-4">
        {isLoading ? (
          <SkeletonTable />
        ) : (
          <ProjectsTable projects={projects} users={users} />
        )}
      </div>
      <ProjectModal />
    </div>
  )
}
