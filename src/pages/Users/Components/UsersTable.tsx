import { User } from "../types"
import { Badge } from "@/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { CellActions } from "./CellActions"

export const UsersTable = ({ users }: { users: User[] }) => {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "fullname",
      filterFn: (row, _, value) => {
        const fullname = `${row.original.firstname} ${row.original.lastname}`
        return fullname.toLowerCase().includes(value.toLowerCase())
      },
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
      cell: ({ row }) => `${row.original.firstname} ${row.original.lastname}`,
      sortingFn: (rowA, rowB) => {
        return rowA.original.firstname.localeCompare(rowB.original.firstname)
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
      accessorKey: "role",
      header: "Rol",
      cell: ({ row }) => row.original.role,
    },
    {
      accessorKey: "status",
      header: "Estado",
      cell: ({ row }) => (
        <Badge variant={`${row.original.status ? "default" : "destructive"}`}>
          {row.original.status ? "Activo" : "Inactivo"}
        </Badge>
      ),
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
