import { SkeletonTable } from "@/components/SkeletonTable"
import { useGetTasks } from "@/pages/Tasks/api/useGetTasks"
import { TasksTable } from "@/pages/Reports/components/TasksTable"
import { ReportsHeader } from "../components/ReportsHeader"

export const AdminReport = () => {
  const { data: tasks = [], isLoading } = useGetTasks()

  return (
    <div>
      <ReportsHeader userType="admin" />
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
