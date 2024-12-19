import { useParams } from "react-router-dom"
import { useGetMyProjectTasks } from "./api/useGetMyProjectTasks"
import { useGetProject } from "../api/useGetProject"
import { Button } from "@/components/ui/button"
import { TaskModal } from "./components/TaskModal"
import { useTaskModal } from "./hooks/useTaskModal"
import { TaskStatusEnum } from "@/db/db"
import { TaskColumn } from "./components/TaskColumn"
import { DragDropContext, DropResult } from "@hello-pangea/dnd"
import { useState } from "react"

export const ProjectIdPage = () => {
  const params = useParams()

  const [isDragging, setIsDragging] = useState(false)

  const modalTask = useTaskModal()

  const projectId = params.projectId as string

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
    options: {
      enabled: !!projectId,
    },
  })

  const pendingTasks = projectTasks.filter(
    (task) => task.status === TaskStatusEnum.PENDING,
  )

  const inProgressTasks = projectTasks.filter(
    (task) => task.status === TaskStatusEnum.IN_PROGRESS,
  )

  const completedTasks = projectTasks.filter(
    (task) => task.status === TaskStatusEnum.COMPLETED,
  )

  const isLoading = isLoadingProject || isLoadingProjectTasks

  if (isErrorProject || isErrorProjectTasks) {
    return <div>Error</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  const handleDragEnd = (result: DropResult) => {
    setIsDragging(false)

    const { destination, source } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    console.log({
      source,
      destination,
    })
  }

  return (
    <div>
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
      <DragDropContext
        onDragEnd={handleDragEnd}
        onDragStart={() => setIsDragging(true)}
      >
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <TaskColumn
            title={TaskStatusEnum.PENDING}
            items={pendingTasks}
            isDragging={isDragging}
          />
          <TaskColumn
            title={TaskStatusEnum.IN_PROGRESS}
            items={inProgressTasks}
            isDragging={isDragging}
          />
          <TaskColumn
            title={TaskStatusEnum.COMPLETED}
            items={completedTasks}
            isDragging={isDragging}
          />
        </div>
      </DragDropContext>
      <TaskModal />
    </div>
  )
}
