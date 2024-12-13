import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { TaskForm } from "./TaskForm"
import { useTaskModal } from "../hooks/useTaskModal"

export const TaskModal = () => {
  const modalTask = useTaskModal()

  return (
    <Dialog open={modalTask.isOpen} onOpenChange={modalTask.onClose}>
      <DialogContent className="max-h-[calc(100vh-210px)] w-11/12 overflow-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {modalTask.item ? "Editar tarea" : "Crear tarea"}
          </DialogTitle>
        </DialogHeader>
        <TaskForm />
      </DialogContent>
    </Dialog>
  )
}
