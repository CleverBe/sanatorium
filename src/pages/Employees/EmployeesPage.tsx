import { Button } from "@/components/ui/button"
import { SkeletonTable } from "@/components/SkeletonTable"
import { useEmployeeModal } from "./hooks/useEmployeeModal"
import { EmployeesTable } from "./components/EmployeesTable"
import { EmployeeModal } from "./components/EmployeeModal"
import { useGetCurrentUser } from "../Profile/api/useGetCurrentUser"
import { useGetManagerEmployees } from "./api/useGetManagerEmployees"

export const EmployeesPage = () => {
  const { data: user } = useGetCurrentUser()

  const { data, isLoading } = useGetManagerEmployees({
    encargadoId: user?.id as number,
  })

  const employees = data?.employees || []

  const modalEmployee = useEmployeeModal()

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold">Administrar empleados</h1>

        <Button
          onClick={() => {
            modalEmployee.onOpen()
          }}
          className="max-w-xs"
        >
          Agregar empleado
        </Button>
      </div>

      <div className="mt-4">
        {isLoading ? (
          <SkeletonTable withSearchInput />
        ) : (
          <EmployeesTable employees={employees} />
        )}
      </div>
      <EmployeeModal />
    </div>
  )
}
