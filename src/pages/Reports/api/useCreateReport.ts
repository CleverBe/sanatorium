import { api } from "@/lib/axios"
import { ProjectStatusEnum } from "@/pages/Projects/types"
import { useQuery } from "@tanstack/react-query"

interface CreateReportFnProps {
  userType: "admin" | "encargado"
  empleado_name?: string
  proyecto_id?: string
  fecha_inicio?: string
  fecha_fin?: string
  estado?: ProjectStatusEnum
}

export const createReportFn = async ({
  userType,
  empleado_name,
  proyecto_id,
  fecha_inicio,
  fecha_fin,
  estado,
}: CreateReportFnProps) => {
  const params = {
    empleado_name,
    proyecto_id,
    fecha_inicio,
    fecha_fin,
    estado,
  }

  const response = await api.get(`/tasks/report/${userType}/`, {
    params,
    responseType: "blob",
  })

  const blob = new Blob([response.data], { type: "application/pdf" })
  const blobUrl = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = blobUrl
  link.download = "reporte_tareas.pdf"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  return true
}

interface useCreateReportProps {
  userType: "admin" | "encargado"
  empleado_name?: string
  proyecto_id?: string
  fecha_inicio?: string
  fecha_fin?: string
  estado?: ProjectStatusEnum
}

export const useCreateReport = ({ ...props }: useCreateReportProps) => {
  return useQuery({
    queryFn: () => createReportFn(props),
    queryKey: ["createReport"],
    enabled: false,
  })
}
