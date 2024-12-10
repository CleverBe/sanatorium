import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetUserProjects } from "./api/useGetUserProjects"
import { utcToLocalDate } from "@/helpers/dates"
import { getProjectStatus } from "@/pages/Projects/helpers"

export const DashboardEmployee = () => {
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
            <Card key={project.id} className="rounded-sm">
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
                  {`Estado: `}
                  <span className="font-semibold">
                    {getProjectStatus(project.status)}
                  </span>
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
    </div>
  )
}
