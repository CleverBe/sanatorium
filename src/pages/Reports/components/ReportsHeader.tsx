import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { ProjectStatusEnum } from "@/pages/Projects/types"
import { useFilters } from "../context/FiltersContext"
import { useCreateReport } from "../api/useCreateReport"
import { useEffect } from "react"

export const ReportsHeader = ({
  userType,
}: {
  userType: "admin" | "encargado"
}) => {
  const { filters } = useFilters()

  const { refetch, isLoading, isError, error } = useCreateReport({
    userType,
    empleado_name: filters.employee || undefined,
    estado: (filters.status || undefined) as ProjectStatusEnum | undefined,
    proyecto_id: filters["project.id"] || undefined,
    fecha_inicio: filters.startDate || undefined,
    fecha_fin: filters.endDate || undefined,
  })

  useEffect(() => {
    if (isError) {
      toast.error(
        "Error al generar el reporte. Debe seleccionar al menos un filtro.",
      )
    }
  }, [isError, error])

  const onGenerateReport = async () => {
    const { startDate, endDate } = filters
    if (startDate && !endDate) {
      toast.error("Seleccione una fecha fin")
      return
    }

    if (!startDate && endDate) {
      toast.error("Seleccione una fecha inicio")
      return
    }

    if (new Date(endDate) < new Date(startDate)) {
      toast.error("La fecha fin debe ser posterior a la fecha inicio")
      return
    }

    await refetch()
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h1 className="text-2xl font-bold">
        Reporte de tareas realizadas por empleados
      </h1>
      <Button onClick={onGenerateReport} disabled={isLoading}>
        Generar reporte PDF
      </Button>
    </div>
  )
}
