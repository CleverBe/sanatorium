import { CustomSelect } from "@/components/ui/customSelect"
import { useGetCurrentUser } from "@/pages/Profile/api/useGetCurrentUser"
import { useGetManagerProjects } from "@/pages/Projects/api/useGetManagerProjects"
import { useGetProject } from "@/pages/Projects/api/useGetProject"
import { useGetProjectTasks } from "@/pages/Projects/ProjectIdPage/api/useGetProjectTasks"
import { useState } from "react"
import { ProjectProgressCharts } from "../components/ProjectProgressCharts"

export const DashboardManager = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  const { data: user } = useGetCurrentUser()
  const { data: tasks = [], isLoading: isLoadingTasks } = useGetProjectTasks({
    projectId: Number(selectedProject),
    options: {
      enabled: !!selectedProject,
    },
  })
  const { data: projects = [], isLoading: isLoadingProjects } =
    useGetManagerProjects({
      managerId: user?.id as number,
    })
  const { data: project, isLoading: isLoadingProject } = useGetProject({
    projectId: Number(selectedProject),
    options: {
      enabled: !!selectedProject,
    },
  })

  if (isLoadingTasks || isLoadingProjects || isLoadingProject) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="text-2xl">BIENVENIDO {user?.name.toUpperCase()}</div>
      <div className="mt-4 flex items-center justify-center text-xl font-semibold">
        Métricas de progreso de proyectos
      </div>
      <div className="mt-4 max-w-sm">
        <CustomSelect
          options={projects.map((user) => ({
            label: user.name,
            value: user.id.toString(),
          }))}
          defaultValue={selectedProject || ""}
          onValueChange={setSelectedProject}
          placeholder="Seleccione un proyecto"
          showSearch
        />
      </div>
      {!project ? (
        <div>
          <div className="mt-4 flex items-center justify-center text-xl font-semibold">
            Seleccione un proyecto
          </div>
        </div>
      ) : (
        <ProjectProgressCharts project={project} tasks={tasks} />
      )}
    </div>
  )
}
