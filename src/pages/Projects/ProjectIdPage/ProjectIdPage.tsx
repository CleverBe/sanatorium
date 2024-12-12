import { useParams } from "react-router-dom"
import { useGetMyProjectTasks } from "./api/useGetMyProjectTasks"

export const ProjectIdPage = () => {
  const params = useParams()

  const projectId = params.projectId as string

  const { data: projectTasks = [], isLoading } = useGetMyProjectTasks({
    projectId,
    options: {
      enabled: !!projectId,
    },
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Project ID: {projectId}</h1>
      {projectTasks.map((task) => (
        <div key={task.id}>{task.name}</div>
      ))}
    </div>
  )
}
