import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetUserProjects } from "./api/useGetUserProjects"
import { utcToLocalDate } from "@/helpers/dates"
import { getProjectStatus, getTaskPriority } from "@/pages/Projects/helpers"
import { Badge } from "@/components/ui/badge"
import { ProjectStatusEnum } from "@/pages/Projects/types"
import { ProjectDetail } from "./components/ProjectDetail"
import { useProjectDetail } from "./hooks/useProjectDetail"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useGetUserTasks } from "@/pages/Projects/ProjectIdPage/api/useGetUserTasks"
import { useGetCurrentUser } from "@/pages/Profile/api/useGetCurrentUser"
import { TaskPriorityEnum } from "@/db/db"

export const DashboardEmployee = () => {
  const { onOpen: onOpenDetail } = useProjectDetail()
  const navigate = useNavigate()

  const { data: user } = useGetCurrentUser()

  const { data: projects = [], isLoading: isLoadingProjects } =
    useGetUserProjects({
      userId: user?.id as string,
      options: {
        enabled: !!user?.id,
      },
    })

  const { data: tasks = [], isLoading: isLoadingTasks } = useGetUserTasks({
    userId: user?.id as string,
    options: {
      enabled: !!user?.id,
    },
  })

  const isLoading = isLoadingProjects || isLoadingTasks

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Proyectos asignados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="cursor-pointer rounded-sm hover:scale-105"
              onClick={() => onOpenDetail(project)}
            >
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col text-sm md:flex-row">
                <div className="w-full md:w-[65%]">
                  <div>
                    {`Fecha limite: `}
                    <span className="whitespace-nowrap font-semibold">
                      {utcToLocalDate(project.endDate)}
                    </span>
                  </div>
                </div>
                <div className="flex w-full flex-col items-center justify-center space-y-2 md:w-[35%]">
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
                  <Button
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/myprojects/${project.id}`)
                    }}
                  >
                    <ArrowRight className="size-4" />
                  </Button>
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
        <CardContent>
          {tasks.map((task) => (
            <Card
              key={task.id}
              className="cursor-pointer rounded-sm"
              onClick={() => navigate(`/myprojects/${task.projectId}`)}
            >
              <CardHeader className="p-4">
                <CardTitle>{task.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col text-sm md:flex-row">
                <div className="w-full md:w-[65%]">
                  <div>
                    {`Fecha vencimiento: `}
                    <span className="whitespace-nowrap font-semibold">
                      {utcToLocalDate(task.expectedCompletionDate)}
                    </span>
                  </div>
                  <div>Proyecto: {task.project.name}</div>
                </div>
                <div className="flex w-full flex-col items-center justify-center space-y-2 md:w-[35%]">
                  <Badge
                    variant={
                      task.priority === TaskPriorityEnum.HIGH
                        ? "destructive"
                        : task.priority === TaskPriorityEnum.MEDIUM
                          ? "default"
                          : "secondary"
                    }
                  >
                    {getTaskPriority(task.priority)}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
      <ProjectDetail />
    </div>
  )
}
