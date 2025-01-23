import { CustomSelect } from "@/components/ui/customSelect"
import { useRef, useState } from "react"
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
import { useGetUsers } from "@/pages/Users/api/useGetUsers"
import { RoleEnum } from "@/pages/Users/types"
import { useGetUserTasks } from "@/pages/Projects/ProjectIdPage/api/useGetUserTasks"
import { TaskStatusEnum } from "@/pages/Tasks/types"
import { WorkDistributionCharts } from "./components/WorkDistributionCharts"
import { Spinner } from "@/components/Spinner"

export const AdminWorkDistribution = () => {
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
      <main className="flex h-screen items-center justify-center">
        <Spinner className="h-12 w-12" />
      </main>
    )
  }

  const handleExportToPDF = async () => {
    const content = containerRef.current

    if (!content) return

    // Captura el contenido usando html2canvas
    const canvas = await html2canvas(content, {
      scale: 2, // Mejora la calidad de la captura
    })

    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF("p", "mm", "letter")

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()

    const imgWidth = pdfWidth // Ajustar al ancho de la página
    const imgHeight = (canvas.height * pdfWidth) / canvas.width

    const topMargin = 20 // Margen superior
    const bottomMargin = 20 // Margen inferior
    const yOffset = topMargin // Posición inicial del contenido

    // Comprueba si la altura de la imagen cabe en una sola página
    if (imgHeight + topMargin + bottomMargin <= pdfHeight) {
      pdf.addImage(imgData, "PNG", 0, yOffset, imgWidth, imgHeight)
    } else {
      let remainingHeight = imgHeight

      while (remainingHeight > 0) {
        const currentHeight = Math.min(
          remainingHeight,
          pdfHeight - topMargin - bottomMargin,
        )

        pdf.addImage(imgData, "PNG", 0, yOffset, imgWidth, currentHeight)

        remainingHeight -= currentHeight

        if (remainingHeight > 0) {
          pdf.addPage()
        }
      }
    }

    const employeeName = employees.find(
      (employee) => employee.id === Number(selectedEmployee),
    )?.name

    pdf.save(`Reporte trabajo - ${employeeName}.pdf`)
  }

  return (
    <div>
      <div className="flex flex-col flex-wrap items-center space-x-4 md:flex-row">
        <div className="min-w-[300px] max-w-sm">
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
        <div className="mt-9 flex items-center justify-center text-xl font-semibold">
          <p className="max-w-[400px] rounded-md bg-gray-200 p-4 text-center">
            Seleccione un empleado para ver el reporte de distribución de
            trabajo
          </p>
        </div>
      ) : (
        <div ref={containerRef}>
          <div className="mt-9 flex items-center justify-center text-xl font-semibold">
            Reporte de distribución de trabajo
          </div>
          {employees.find((user) => user.id === Number(selectedEmployee))
            ?.name && (
            <div className="mt-4 flex items-center justify-center">
              Empleado:{" "}
              {
                employees.find((user) => user.id === Number(selectedEmployee))
                  ?.name
              }
            </div>
          )}
          {startDate && endDate && (
            <div className="mt-4 flex items-center justify-center">
              Período: {format(startDate, "dd-MM-yyyy", { locale: es })} al{" "}
              {format(endDate, "dd-MM-yyyy", { locale: es })}
            </div>
          )}
          <div className="mt-4">
            <WorkDistributionCharts tasks={userTasks} />
          </div>
        </div>
      )}
    </div>
  )
}
