import { AlertModal } from "@/components/modals/alertModal"
import { Button } from "@/components/ui/button"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import { useState } from "react"
import { useDeleteTask } from "../api/useDeleteTask"
import { useTaskModal } from "../hooks/useTaskModal"
import { Task } from "@/pages/Tasks/types"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export const TaskItemActions = ({
  task,
  isProjectFinished,
}: {
  task: Task
  isProjectFinished: boolean
}) => {
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
      <Popover>
        <PopoverTrigger asChild>
          <Button className="h-auto w-auto p-2" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 px-0 py-2" side="bottom" align="start">
          <Button
            onClick={() => {
              modalTask.onOpen(task)
            }}
            className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
            variant="ghost"
          >
            <Edit className="mr-2 size-4" />
            Actualizar
          </Button>
          {!isProjectFinished && (
            <Button
              onClick={() => {
                setOpen(true)
              }}
              className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
              variant="ghost"
            >
              <Trash className="mr-2 size-4" />
              Eliminar
            </Button>
          )}
        </PopoverContent>
      </Popover>
    </>
  )
}
