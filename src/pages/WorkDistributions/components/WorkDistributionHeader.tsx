import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CustomSelect } from "@/components/ui/customSelect"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Task } from "@/pages/Tasks/types"
import { User } from "@/pages/Users/types"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"

export const WorkDistributionHeader = ({
  selectedEmployee,
  setSelectedEmployee,
  employees,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleExportToPDF,
  userTasks,
  currentMonth,
  setCurrentMonth,
}: {
  selectedEmployee: string
  setSelectedEmployee: (value: string) => void
  employees: User[]
  startDate: Date | undefined
  setStartDate: (date: Date | undefined) => void
  endDate: Date | undefined
  setEndDate: (date: Date | undefined) => void
  handleExportToPDF: () => void
  userTasks: Task[]
  currentMonth: Date
  setCurrentMonth: (date: Date) => void
}) => {
  return (
    <div className="flex flex-col flex-wrap items-center space-x-4 space-y-4 md:flex-row md:space-y-0">
      <div className="m-1 w-full min-w-[300px] md:max-w-sm">
        <CustomSelect
          options={employees.map((user) => ({
            label: user.name,
            value: user.id.toString(),
          }))}
          defaultValue={selectedEmployee || ""}
          onValueChange={setSelectedEmployee}
          placeholder="Empleado"
          showSearch
        />
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "m-1 w-full min-w-[300px] justify-start text-left font-normal md:min-w-40 md:max-w-40",
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
              "m-1 w-full min-w-[300px] justify-start text-left font-normal md:min-w-40 md:max-w-40",
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
      {selectedEmployee && userTasks.length > 0 && (
        <Button className="m-1" onClick={handleExportToPDF}>
          Exportar
        </Button>
      )}
    </div>
  )
}
