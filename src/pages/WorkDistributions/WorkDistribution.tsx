import { CustomSelect } from "@/components/ui/customSelect"
import { useState } from "react"
import { WorkDistributionCharts } from "./Admin/components/WorkDistributionCharts"
import { useGetUsers } from "../Users/api/useGetUsers"
import { RoleEnum } from "../Users/types"
import { useGetUserTasks } from "../Projects/ProjectIdPage/api/useGetUserTasks"
import { TaskStatusEnum } from "../Tasks/types"

export const WorkDistribution = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null)

  const { data: users = [], isLoading: isLoadingUsers } = useGetUsers()

  const employees = users.filter((user) => user.role === RoleEnum.EMPLOYEE)

  const { data: tasks, isLoading: isLoadingTasks } = useGetUserTasks({
    userId: Number(selectedEmployee),
    options: {
      enabled: !!selectedEmployee,
    },
  })

  const userTasks = (tasks || []).filter(
    (task) => task.status === TaskStatusEnum.COMPLETED,
  )

  if (isLoadingUsers || isLoadingTasks) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-center text-xl font-semibold">
        Reporte de distribución de trabajo
      </div>
      <div className="mt-4 max-w-sm">
        <CustomSelect
          options={employees.map((user) => ({
            label: user.name,
            value: user.id.toString(),
          }))}
          defaultValue={selectedEmployee || ""}
          onValueChange={setSelectedEmployee}
          placeholder="Seleccione un empleado"
          showSearch
        />
      </div>
      {userTasks.length === 0 ? (
        <div>
          <div className="mt-4 flex items-center justify-center text-xl font-semibold">
            Seleccione un proyecto
          </div>
        </div>
      ) : (
        <WorkDistributionCharts tasks={userTasks} />
      )}
    </div>
  )
}
