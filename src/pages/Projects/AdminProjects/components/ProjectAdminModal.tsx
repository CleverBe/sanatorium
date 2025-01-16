import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ProjectForm } from "../../components/ProjectForm"
import { useAdminProjectModal } from "../hooks/useAdminProjectModal"

export const ProjectAdminModal = () => {
  const modalProject = useAdminProjectModal()

  return (
    <Dialog open={modalProject.isOpen} onOpenChange={modalProject.onClose}>
      <DialogContent className="max-h-[calc(100vh-210px)] w-11/12 overflow-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {modalProject.item ? "Editar proyecto" : "Crear proyecto"}
          </DialogTitle>
        </DialogHeader>
        <ProjectForm />
      </DialogContent>
    </Dialog>
  )
}
