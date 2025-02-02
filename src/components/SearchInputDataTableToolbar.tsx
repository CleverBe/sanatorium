import { Input } from "@/components/ui/input"
import { Table } from "@tanstack/react-table"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  filterInputPlaceholder?: string
  filterInputValue?: string
}

export function SearchInputDataTableToolbar<TData>({
  filterInputPlaceholder,
  filterInputValue,
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex flex-wrap items-center gap-2">
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
    </div>
  )
}
