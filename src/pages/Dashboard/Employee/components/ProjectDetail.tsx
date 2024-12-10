import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useProjectDetail } from "../hooks/useProjectDetail"
import { Badge } from "@/components/ui/badge"
import { getProjectStatus } from "@/pages/Projects/helpers"
import { ProjectStatusEnum } from "@/pages/Projects/types"
import { utcToLocalDate } from "@/helpers/dates"

export const ProjectDetail = () => {
  const modalProject = useProjectDetail()

  if (!modalProject.item) {
    return null
  }

  return (
    <Dialog open={modalProject.isOpen} onOpenChange={modalProject.onClose}>
      <DialogContent className="max-h-[calc(100vh-210px)] w-11/12 overflow-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {modalProject.item.name}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>{modalProject.item.description}</div>
          <div>
            <span className="font-semibold">Fecha de inicio: </span>
            <span>{utcToLocalDate(modalProject.item.startDate)}</span>
          </div>
          <div>
            <span className="font-semibold">Fecha de fin estimada: </span>
            <span>{utcToLocalDate(modalProject.item.endDate)}</span>
          </div>
          <div>
            <span className="font-semibold">Estado: </span>
            <Badge
              variant={
                modalProject.item.status === ProjectStatusEnum.COMPLETED
                  ? "secondary"
                  : modalProject.item.status === ProjectStatusEnum.IN_PROGRESS
                    ? "destructive"
                    : "default"
              }
            >
              {getProjectStatus(modalProject.item.status)}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
