import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { getTaskStatus } from "@/pages/Projects/helpers"
import { utcToLocalDate } from "@/helpers/dates"
import { ManagerDataTableToolbar } from "../Manager/components/ManagerDataTableToolbar"
import { Task } from "../../Tasks/types"
import { useGetCurrentUser } from "@/pages/Profile/api/useGetCurrentUser"
import { RoleEnum } from "@/pages/Users/types"
import { AdminDataTableToolbar } from "../Admin/components/AdminDataTableToolbar"

export const TasksTable = ({ tasks }: { tasks: Task[] }) => {
  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: "employee",
      filterFn: (row, _, value) => {
        const fullname = row.original.user.name
        return fullname.toLowerCase().includes(value.toLowerCase())
      },
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Empleado
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        )
      },
      sortingFn: (rowA, rowB) => {
        return rowA.original.user.name.localeCompare(rowB.original.user.name)
      },
      cell: ({ row }) => `${row.original.user.name}`,
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Título
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        )
      },
      cell: ({ row }) => row.original.title,
    },
    {
      accessorKey: "description",
      header: "Descripción",
      cell: ({ row }) => row.original.description.slice(0, 50),
    },
    {
      id: "project.id",
      accessorKey: "project.id",
      header: "Proyecto",
      cell: ({ row }) => row.original.project.name,
    },
    {
      accessorKey: "date",
      header: "Fecha",
      cell: ({ row }) => (
        <div className="text-nowrap">
          {utcToLocalDate(row.original.expectedCompletionDate)}
        </div>
      ),
      filterFn: (row, _, filterValue) => {
        const taskDate = new Date(row.original.expectedCompletionDate)
        const [startDate, endDate] = filterValue || [null, null]
        if (startDate && taskDate < new Date(startDate)) return false
        if (endDate && taskDate > new Date(endDate)) return false
        return true
      },
    },
    {
      accessorKey: "estimatedHours",
      header: "Horas dedicadas",
      cell: ({ row }) => row.original.estimatedHours,
    },
    {
      accessorKey: "status",
      header: "Estado",
      cell: ({ row }) => getTaskStatus(row.original.status),
    },
  ]

  const { data: user } = useGetCurrentUser()

  return (
    <DataTable
      columns={columns}
      data={tasks}
      filterInputPlaceholder="Buscar por nombre"
      filterInputValue="employee"
      DataTabletoolbar={
        user?.role === RoleEnum.ADMIN
          ? AdminDataTableToolbar
          : ManagerDataTableToolbar
      }
    />
  )
}
