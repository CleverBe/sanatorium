import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserForm } from "./UserForm";
import { useUserModal } from "../hooks/useUserModal";

export const UserModal = () => {
  const modalUser = useUserModal();

  return (
    <Dialog open={modalUser.isOpen} onOpenChange={modalUser.onClose}>
      <DialogContent className="max-h-[calc(100vh-210px)] w-11/12 overflow-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {modalUser.item ? "Editar usuario" : "Crear usuario"}
          </DialogTitle>
        </DialogHeader>
        <UserForm />
      </DialogContent>
    </Dialog>
  );
};
