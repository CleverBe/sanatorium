import { Project, ProjectStatusEnum } from "../types"
import { CellActions } from "./CellActions"
import { User } from "@/pages/Users/types"
import { utcToLocalDate } from "@/helpers/dates"
import { getProjectStatus } from "../helpers"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, CheckCircle, Circle, Timer } from "lucide-react"

export const ProjectsTable = ({
  projects,
  managers,
}: {
  projects: Project[]
  managers: User[]
}) => {
  const getUserName = (id: number) => {
    const manager = managers.find((manager) => manager.id === id)

    return manager ? `${manager.name}` : ""
  }

  const columns: ColumnDef<Project>[] = [
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
      accessorKey: "description",
      header: "Descripción",
    },
    {
      accessorKey: "status",
      header: "Estado",
      cell: ({ row }) => {
        const projectStatus = row.original.status
        return (
          <div
            className="flex items-center"
            title={getProjectStatus(projectStatus)}
          >
            {projectStatus === ProjectStatusEnum.PENDING ? (
              <Circle className="mr-2 size-4" />
            ) : projectStatus === ProjectStatusEnum.IN_PROGRESS ? (
              <Timer className="mr-2 size-4" />
            ) : (
              <CheckCircle className="mr-2 size-4" />
            )}
            <span>{getProjectStatus(projectStatus)}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "inCharge",
      header: "A cargo",
      cell: ({ row }) => getUserName(row.original.inCharge),
    },
    {
      accessorKey: "startDate",
      header: "Fecha de inicio",
      cell: ({ row }) => utcToLocalDate(row.original.startDate),
    },
    {
      accessorKey: "endDate",
      header: "Fecha de fin",
      cell: ({ row }) => utcToLocalDate(row.original.endDate),
    },
    {
      id: "actions",
      cell: ({ row }) => <CellActions project={row.original} />,
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={projects}
      filterInputPlaceholder="Buscar por nombre"
      filterInputValue="name"
    />
  )
}
