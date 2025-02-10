import { CustomSelect } from "@/components/ui/customSelect"
import { Column } from "@tanstack/react-table"

interface DataTableSelectFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: {
    label: string
    value: string
  }[]
  showSearch?: boolean
  className?: string
  handleFilterChange: (columnId: string, value: string) => void
}

export function DataTableSelectFilter<TData, TValue>({
  column,
  title,
  options,
  showSearch,
  className,
  handleFilterChange,
}: DataTableSelectFilterProps<TData, TValue>) {
  const selectedValue = column?.getFilterValue() as string

  return (
    <CustomSelect
      showSearch={showSearch}
      placeholder={title}
      options={options}
      value={selectedValue || ""}
      onValueChange={(val) => {
        column?.setFilterValue(val || undefined)
        handleFilterChange(column?.id || "", val || "")
      }}
      className={className}
    />
  )
}
