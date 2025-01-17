import { SkeletonTable } from "@/components/SkeletonTable"
import { useGetTasks } from "@/pages/Tasks/api/useGetTasks"
import { TasksTable } from "@/pages/Reports/components/TasksTable"

export const AdminReport = () => {
  const { data: tasks = [], isLoading } = useGetTasks()

  return (
    <div>
      <div className="flex items-center justify-between">
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
