import { Input } from "@/components/ui/input"
import { Table } from "@tanstack/react-table"
import { getTaskStatus } from "@/pages/Projects/helpers"
import { useEffect, useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { es } from "date-fns/locale"
import { TaskStatusEnum } from "../../../Tasks/types"
import { DataTableSelectFilter } from "../../components/DataTableSelectFilter"
import { useGetManagerProjects } from "@/pages/Projects/api/useGetManagerProjects"
import { useGetCurrentUser } from "@/pages/Profile/api/useGetCurrentUser"
import { useFilters } from "../../context/FiltersContext"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  filterInputPlaceholder?: string
  filterInputValue?: string
}

export function ManagerDataTableToolbar<TData>({
  filterInputPlaceholder,
  filterInputValue,
  table,
}: DataTableToolbarProps<TData>) {
  const { setFilters } = useFilters()

  const { data: user } = useGetCurrentUser()
  const { data: projects = [] } = useGetManagerProjects({
    managerId: user?.id as number,
  })

  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const handleFilterChange = (columnId: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [columnId]: value,
    }))
  }

  useEffect(() => {
    if (startDate) {
      setCurrentMonth(startDate)
    }
  }, [startDate])

  useEffect(() => {
    const dateColumn = table.getColumn("date")
    if (dateColumn) {
      const formattedStartDate = startDate
        ? format(startDate, "yyyy-MM-dd")
        : null
      const formattedEndDate = endDate ? format(endDate, "yyyy-MM-dd") : null

      dateColumn.setFilterValue([formattedStartDate, formattedEndDate])

      handleFilterChange("startDate", formattedStartDate || "")
      handleFilterChange("endDate", formattedEndDate || "")
    }
  }, [startDate, endDate])

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filterInputValue && (
        <Input
          placeholder={filterInputPlaceholder ?? "Buscar..."}
          value={
            (table.getColumn(filterInputValue)?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) => {
            handleFilterChange(filterInputValue, event.target.value)

            table
              .getColumn(filterInputValue)
              ?.setFilterValue(event.target.value)
          }}
          className="max-w-sm"
        />
      )}
      {table.getColumn("project.id") && (
        <DataTableSelectFilter
          column={table.getColumn("project.id")}
          title="Proyecto"
          options={projects.map((project) => ({
            label: project.name,
            value: project.id.toString(),
          }))}
          showSearch
          className="w-full max-w-sm md:w-48"
          handleFilterChange={handleFilterChange}
        />
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full max-w-sm justify-start text-left font-normal md:w-48",
              !startDate && "text-muted-foreground",
            )}
          >
            <CalendarIcon />
            {startDate ? (
              format(startDate, "dd-MM-yyyy", { locale: es })
            ) : (
              <span>Fecha de inicio</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={startDate}
            onSelect={setStartDate}
            initialFocus
            month={currentMonth}
            onMonthChange={setCurrentMonth}
          />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full max-w-sm justify-start text-left font-normal md:w-48",
              !endDate && "text-muted-foreground",
            )}
          >
            <CalendarIcon />
            {endDate ? (
              format(endDate, "dd-MM-yyyy", { locale: es })
            ) : (
              <span>Fecha de fin</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={endDate}
            onSelect={setEndDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {table.getColumn("status") && (
        <DataTableSelectFilter
          column={table.getColumn("status")}
          title="Estado"
          options={Object.values(TaskStatusEnum).map((val) => ({
            label: getTaskStatus(val),
            value: val,
          }))}
          className="w-full max-w-sm md:w-48"
          handleFilterChange={handleFilterChange}
        />
      )}
    </div>
  )
}
