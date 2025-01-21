import { Navigate, useParams } from "react-router-dom"
import { useGetMyProjectTasks } from "./api/useGetMyProjectTasks"
import { useGetProject } from "../api/useGetProject"
import { Button } from "@/components/ui/button"
import { TaskModal } from "./components/TaskModal"
import { useTaskModal } from "./hooks/useTaskModal"
import { TaskStatusEnum } from "@/pages/Tasks/types"
import { ListWithTasks, TasksLists } from "./components/TasksLists"
import { useGetCurrentUser } from "@/pages/Profile/api/useGetCurrentUser"

export const ProjectIdPage = () => {
  const { data: user } = useGetCurrentUser()
  const userId = user?.id as number
  const params = useParams()

  const modalTask = useTaskModal()

  const projectId = Number(params.projectId)

  const {
    data: project,
    isLoading: isLoadingProject,
    isError: isErrorProject,
  } = useGetProject({
    projectId,
  })

  const {
    data: projectTasks = [],
    isLoading: isLoadingProjectTasks,
    isError: isErrorProjectTasks,
  } = useGetMyProjectTasks({
    projectId,
    employeeId: userId,
    options: {
      enabled: !!projectId,
    },
  })

  const lists: ListWithTasks[] = [
    {
      id: TaskStatusEnum.PENDING,
      tasks: projectTasks
        .filter((task) => task.status === TaskStatusEnum.PENDING)
        .sort((a, b) => a.order - b.order),
    },
    {
      id: TaskStatusEnum.IN_PROGRESS,
      tasks: projectTasks
        .filter((task) => task.status === TaskStatusEnum.IN_PROGRESS)
        .sort((a, b) => a.order - b.order),
    },
    {
      id: TaskStatusEnum.COMPLETED,
      tasks: projectTasks
        .filter((task) => task.status === TaskStatusEnum.COMPLETED)
        .sort((a, b) => a.order - b.order),
    },
  ]

  const isLoading = isLoadingProject || isLoadingProjectTasks

  if (isLoading) {
    return <div>Cargando...</div>
  }

  if (!isLoading && (isErrorProject || isErrorProjectTasks || !project)) {
    return <Navigate to="/dashboard" />
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold">Proyecto: {project?.name}</h1>
        <Button
          onClick={() => {
            modalTask.onOpen()
          }}
        >
          Agregar tarea
        </Button>
      </div>
      <TasksLists lists={lists} />
      <TaskModal />
    </div>
  )
}
