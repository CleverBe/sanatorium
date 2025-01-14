import { AlertModal } from "@/components/modals/alertModal"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import { useState } from "react"
import { useDeleteTask } from "../api/useDeleteTask"
import { useTaskModal } from "../hooks/useTaskModal"
import { Task } from "@/pages/Tasks/types"

export const TaskItemActions = ({ task }: { task: Task }) => {
  const modalTask = useTaskModal()

  const [open, setOpen] = useState(false)

  const { mutateAsync, isPending } = useDeleteTask()

  const onDelete = async () => {
    mutateAsync({ id: task.id }).then(() => {
      setOpen(false)
    })
  }

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
          <DropdownMenuItem
            onClick={() => {
              modalTask.onOpen(task)
            }}
          >
            <Edit className="mr-2 size-4" />
            Actualizar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setOpen(true)
            }}
          >
            <Trash className="mr-2 size-4" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
