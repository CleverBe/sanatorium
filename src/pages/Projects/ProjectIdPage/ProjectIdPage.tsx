import { useParams } from "react-router-dom"
import { useGetMyProjectTasks } from "./api/useGetMyProjectTasks"
import { useGetProject } from "../api/useGetProject"
import { Button } from "@/components/ui/button"
import { TaskModal } from "./components/TaskModal"
import { useTaskModal } from "./hooks/useTaskModal"

export const ProjectIdPage = () => {
  const params = useParams()
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

  const isLoading = isLoadingProject || isLoadingProjectTasks

  if (isErrorProject || isErrorProjectTasks) {
    return <div>Error</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
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
      <div className="mt-4 flex flex-col space-y-2">
        {projectTasks.map((task) => (
          <div
            key={task.id}
            className="flex justify-between rounded bg-primary/10 px-4 py-2 text-lg text-primary"
          >
            <div className="font-bold">{task.title}</div>
            <div className="flex space-x-2">
              <Button
                onClick={() => modalTask.onOpen(task)}
                variant="secondary"
              >
                Editar
              </Button>
              <Button variant="destructive">Eliminar</Button>
            </div>
          </div>
        ))}
      </div>
      <TaskModal />
    </div>
  )
}
