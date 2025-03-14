import { utcToLocalDate } from "@/helpers/dates"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, CheckCircle, Circle, Timer } from "lucide-react"
import { ProjectStatusEnum, ProjectWithoutEmployees } from "../../types"
import { getProjectStatus } from "../../helpers"
import { useNavigate } from "react-router-dom"

export const EmployeeProjectsTable = ({
  projects,
}: {
  projects: ProjectWithoutEmployees[]
}) => {
  const navigate = useNavigate()

  const columns: ColumnDef<ProjectWithoutEmployees>[] = [
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
      cell: ({ row }) => {
        return (
          <div
            className="cursor-pointer text-left hover:underline"
            onClick={() => {
              navigate(`/myprojects/${row.original.id}`)
            }}
          >
            {row.original.name}
          </div>
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
          <div className="flex items-center">
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
      cell: ({ row }) => row.original.inCharge.name,
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
