import { Input } from "@/components/ui/input"
import { Table } from "@tanstack/react-table"
import { DataTableFacetedFilter } from "./DataTableFacetedFilter"
import { TaskStatusEnum } from "@/db/db"
import { getTaskStatus } from "@/pages/Projects/helpers"
import { useGetProjects } from "@/pages/Projects/api/useGetProjects"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  filterInputPlaceholder?: string
  filterInputValue?: string
}

export function DataTableToolbar<TData>({
  filterInputPlaceholder,
  filterInputValue,
  table,
}: DataTableToolbarProps<TData>) {
  const { data: projects = [] } = useGetProjects()

  return (
    <div className="flex items-center space-x-2">
      {filterInputValue && (
        <Input
          placeholder={filterInputPlaceholder ?? "Buscar..."}
          value={
            (table.getColumn(filterInputValue)?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table
              .getColumn(filterInputValue)
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      )}
      {table.getColumn("project.id") && (
        <DataTableFacetedFilter
          column={table.getColumn("project.id")}
          title="Proyecto"
          options={projects.map((project) => ({
            label: project.name,
            value: project.id,
          }))}
          showSearch
        />
      )}
      {table.getColumn("status") && (
        <DataTableFacetedFilter
          column={table.getColumn("status")}
          title="Estado"
          options={Object.values(TaskStatusEnum).map((val) => ({
            label: getTaskStatus(val),
            value: val,
          }))}
        />
      )}
    </div>
  )
}
