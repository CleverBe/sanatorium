import { SkeletonTable } from "@/components/SkeletonTable"
import { useGetManagerEmployeesTasks } from "@/pages/Tasks/api/useGetManagerEmployeesTasks"
import { TasksTable } from "@/pages/Reports/components/TasksTable"
import { User } from "@/pages/Users/types"
import { ReportsHeader } from "../components/ReportsHeader"

export const ManagerReport = ({ user }: { user: User }) => {
  const { data: tasks = [], isLoading } = useGetManagerEmployeesTasks({
    managerId: user.id,
  })

  return (
    <div>
      <ReportsHeader userType="encargado" />
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
