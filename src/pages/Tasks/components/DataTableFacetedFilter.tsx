import { CustomSelect } from "@/components/ui/customSelect"
import { Column } from "@tanstack/react-table"

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: {
    label: string
    value: string
  }[]
  showSearch?: boolean
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
  showSearch,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const selectedValues = new Set(column?.getFilterValue() as string[])

  const [value] = selectedValues

  return (
    <CustomSelect
      showSearch={showSearch}
      placeholder={title}
      options={options}
      value={value || ""}
      onValueChange={(e) => {
        const newValue = [e].filter((v) => v !== "")
        column?.setFilterValue(newValue.length ? newValue : undefined)
      }}
      className="w-[200px]"
    />
  )
}
