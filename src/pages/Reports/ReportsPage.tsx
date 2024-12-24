import { SkeletonTable } from "@/components/SkeletonTable"
import { useGetTasks } from "../Tasks/api/useGetTasks"
import { TasksTable } from "../Tasks/components/TasksTable"

export const ReportsPage = () => {
  const { data: tasks = [], isLoading } = useGetTasks()

  return (
    <div>
      <div className="mt-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Reporte de tareas realizadas por empleados
        </h1>
      </div>

      <div className="mt-4">
        {isLoading ? (
          <SkeletonTable withSearchInput />
        ) : (
          <TasksTable tasks={tasks} />
        )}
      </div>
    </div>
  )
}
