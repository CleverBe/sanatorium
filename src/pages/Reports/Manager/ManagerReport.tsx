import { SkeletonTable } from "@/components/SkeletonTable"
import { useGetManagerEmployeesTasks } from "@/pages/Tasks/api/useGetManagerEmployeesTasks"
import { TasksTable } from "@/pages/Reports/components/TasksTable"
import { User } from "@/pages/Users/types"

export const ManagerReport = ({ user }: { user: User }) => {
  const { data: tasks = [], isLoading } = useGetManagerEmployeesTasks({
    managerId: user.id,
  })

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
