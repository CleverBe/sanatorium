import { User } from "../types"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { CellActions } from "./CellActions"
import { getRoleFromEnum } from "@/pages/Projects/helpers"

export const UsersTable = ({ users }: { users: User[] }) => {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nombre
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        )
      },
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
      accessorKey: "rol",
      header: "Rol",
      cell: ({ row }) => getRoleFromEnum(row.original.role),
    },
    {
      id: "actions",
      cell: ({ row }) => <CellActions user={row.original} />,
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={users}
      filterInputPlaceholder="Buscar por nombre"
      filterInputValue="fullname"
    />
  )
}
