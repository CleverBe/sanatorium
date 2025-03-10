import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import { AlertModal } from "@/components/modals/alertModal"
import { useState } from "react"
import { useDeleteProject } from "../../api/useDeleteProject"
import { ProjectWithoutInCharge } from "../../types"
import { useManagerProjectModal } from "../hooks/useManagerProjectModal"

export const CellActions = ({
  project,
}: {
  project: ProjectWithoutInCharge
}) => {
  const modalProject = useManagerProjectModal()

  const [open, setOpen] = useState(false)

  const { mutateAsync, isPending } = useDeleteProject()

  const onDelete = async () => {
    mutateAsync({ id: project.id }).then(() => {
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
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              modalProject.onOpen(project)
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
