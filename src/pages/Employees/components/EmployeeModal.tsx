import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useEmployeeModal } from "../hooks/useEmployeeModal"
import { EmployeeForm } from "./EmployeeForm"

export const EmployeeModal = () => {
  const modalEmployee = useEmployeeModal()

  return (
    <Dialog open={modalEmployee.isOpen} onOpenChange={modalEmployee.onClose}>
      <DialogContent className="max-h-[calc(100vh-210px)] w-11/12 overflow-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {modalEmployee.item ? "Editar empleado" : "Crear empleado"}
          </DialogTitle>
        </DialogHeader>
        <EmployeeForm />
      </DialogContent>
    </Dialog>
  )
}
