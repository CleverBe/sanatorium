import { Navigate, useParams } from "react-router-dom"
import { useGetMyProjectTasks } from "./api/useGetMyProjectTasks"
import { useGetProject } from "../api/useGetProject"
import { TaskModal } from "./components/TaskModal"
import { useTaskModal } from "./hooks/useTaskModal"
import { TaskStatusEnum } from "@/pages/Tasks/types"
import { ListWithTasks, TasksLists } from "./components/TasksLists"
import { useGetCurrentUser } from "@/pages/Profile/api/useGetCurrentUser"
import { useEffect } from "react"
import { Spinner } from "@/components/Spinner"

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

  useEffect(() => {
    const container = document.querySelector(
      "#main-content",
    ) as HTMLDivElement | null

    if (container) {
      container.style.padding = "0"
    }

    return () => {
      if (container) {
        container.style.paddingLeft = "1rem"
        container.style.paddingRight = "1rem"
        container.style.paddingTop = "1.5rem"
      }
    }
  }, [])

  const isLoading = isLoadingProject || isLoadingProjectTasks

  if (isLoading) {
    return (
      <main className="flex h-screen items-center justify-center">
        <Spinner className="h-12 w-12" />
      </main>
    )
  }

  if (!isLoading && (isErrorProject || isErrorProjectTasks || !project)) {
    return <Navigate to="/dashboard" />
  }

  return (
    <div
      className="flex h-full flex-col"
      style={{
        background: `url('/board_background.webp')`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-wrap items-center justify-between space-y-2 px-4 pt-6">
        <h1 className="text-2xl font-bold text-white">{project?.name}</h1>
      </div>
      <TasksLists
        lists={lists}
        onClickAddTask={() => {
          modalTask.onOpen()
        }}
      />
      <TaskModal />
    </div>
  )
}
