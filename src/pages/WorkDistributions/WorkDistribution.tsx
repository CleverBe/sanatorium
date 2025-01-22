import { CustomSelect } from "@/components/ui/customSelect"
import { useRef, useState } from "react"
import { WorkDistributionCharts } from "./Admin/components/WorkDistributionCharts"
import { useGetUsers } from "../Users/api/useGetUsers"
import { RoleEnum } from "../Users/types"
import { useGetUserTasks } from "../Projects/ProjectIdPage/api/useGetUserTasks"
import { TaskStatusEnum } from "../Tasks/types"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { es } from "date-fns/locale"
import { format } from "date-fns"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

export const WorkDistribution = () => {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const containerRef = useRef<HTMLDivElement | null>(null)

  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null)

  const { data: users = [], isLoading: isLoadingUsers } = useGetUsers()

  const employees = users.filter((user) => user.role === RoleEnum.EMPLOYEE)

  const { data: tasks, isLoading: isLoadingTasks } = useGetUserTasks({
    userId: Number(selectedEmployee),
    options: {
      enabled: !!selectedEmployee,
    },
  })

  const userTasks = (tasks || [])
    .filter((task) => task.status === TaskStatusEnum.COMPLETED)
    .filter((task) => {
      if (startDate && endDate) {
        return (
          new Date(task.expectedCompletionDate) >= startDate &&
          new Date(task.expectedCompletionDate) <= endDate
        )
      }
      return true
    })

  if (isLoadingUsers || isLoadingTasks) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900" />
      </div>
    )
  }

  const handleExportToPDF = async () => {
    const pdf = new jsPDF("p", "pt", "letter")

    if (!containerRef.current) return

    const canvas = await html2canvas(containerRef.current, { scale: 2 })
    const imgData = canvas.toDataURL("image/png")

    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()

    // Ajustar la imagen al ancho de la página PDF, manteniendo proporciones
    const imgWidth = pageWidth
    const imgHeight = (canvas.height * pageWidth) / canvas.width

    if (imgHeight > pageHeight) {
      console.warn(
        "El contenido excede la altura de la página. Se ajustará automáticamente.",
      )
    }

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)

    const employee = employees.find(
      (user) => user.id === Number(selectedEmployee),
    )?.name

    const reportName = `Reporte de distribución de trabajo - ${employee}.pdf`

    pdf.save(reportName)
  }

  return (
    <div>
      <div className="flex items-center justify-center text-xl font-semibold">
        Reporte de distribución de trabajo
      </div>
      <div className="mt-4 flex flex-col flex-wrap items-center space-x-4 md:flex-row">
        <div className="min-w-[300px] max-w-sm">
          <CustomSelect
            options={employees.map((user) => ({
              label: user.name,
              value: user.id.toString(),
            }))}
            defaultValue={selectedEmployee || ""}
            onValueChange={setSelectedEmployee}
            placeholder="Seleccione un empleado"
            showSearch
          />
        </div>
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
        <Button onClick={handleExportToPDF}>Exportar</Button>
      </div>
      {userTasks.length === 0 ? (
        <div>
          <div className="mt-4 flex items-center justify-center text-xl font-semibold">
            Seleccione un proyecto
          </div>
        </div>
      ) : (
        <div className="mt-4" ref={containerRef}>
          <WorkDistributionCharts tasks={userTasks} />
        </div>
      )}
    </div>
  )
}
