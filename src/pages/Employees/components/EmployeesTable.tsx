import { Employee } from "../types"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { CellActions } from "./CellActions"
import { SearchInputDataTableToolbar } from "@/components/SearchInputDataTableToolbar"

export const EmployeesTable = ({ employees }: { employees: Employee[] }) => {
  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nombre Completo
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        )
      },
      cell: ({ row }) => `${row.original.name}`,
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Correo electrónico
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "role",
      header: "Rol",
      cell: ({ row }) => row.original.role,
    },
    {
      id: "actions",
      cell: ({ row }) => <CellActions employee={row.original} />,
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={employees}
      filterInputPlaceholder="Buscar por nombre"
      filterInputValue="name"
      DataTabletoolbar={SearchInputDataTableToolbar}
    />
  )
}
