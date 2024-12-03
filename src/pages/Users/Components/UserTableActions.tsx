import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useUserModal } from "../hooks/useUserModal";
import { AlertModal } from "@/components/modals/alertModal";
import { useState } from "react";
import { useDeleteUser } from "../api/useDeleteUser";
import { User } from "../Types";

export const UserTableActions = ({ user }: { user: User }) => {
  const modalUser = useUserModal();

  const [open, setOpen] = useState(false);

  const { mutateAsync, isPending } = useDeleteUser();

  const onDelete = async () => {
    mutateAsync({ id: user.id }).then(() => {
      setOpen(false);
    });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete()}
        loading={isPending}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              modalUser.onOpen(user);
            }}
          >
            <Edit className="mr-2 size-4" />
            Actualizar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            <Trash className="mr-2 size-4" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
