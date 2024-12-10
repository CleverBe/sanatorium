import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetUserProjects } from "./api/useGetUserProjects"
import { utcToLocalDate } from "@/helpers/dates"
import { getProjectStatus } from "@/pages/Projects/helpers"
import { Badge } from "@/components/ui/badge"
import { ProjectStatusEnum } from "@/pages/Projects/types"
import { ProjectDetail } from "./components/ProjectDetail"
import { useProjectDetail } from "./hooks/useProjectDetail"

export const DashboardEmployee = () => {
  const { onOpen: onOpenDetail } = useProjectDetail()

  const { data: projects = [], isLoading: isLoadingProjects } =
    useGetUserProjects()

  const isLoading = isLoadingProjects

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex space-x-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Proyectos asignados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="cursor-pointer rounded-sm"
              onClick={() => onOpenDetail(project)}
            >
              <CardHeader className="p-4">
                <CardTitle>{project.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col text-sm md:flex-row">
                <div className="w-full md:w-[65%]">
                  {`Fecha limite: `}
                  <span className="font-semibold">
                    {utcToLocalDate(project.endDate)}
                  </span>
                </div>
                <div className="w-full md:w-[35%]">
                  <Badge
                    variant={
                      project.status === ProjectStatusEnum.COMPLETED
                        ? "secondary"
                        : project.status === ProjectStatusEnum.IN_PROGRESS
                          ? "destructive"
                          : "default"
                    }
                  >
                    {getProjectStatus(project.status)}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Tareas asignadas</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
      <ProjectDetail />
    </div>
  )
}
