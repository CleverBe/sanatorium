import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Project } from "../types"
import { ProjectTableActions } from "./ProjectTableActions"
import { User } from "@/pages/Users/types"
import { utcToLocalDate } from "@/helpers/dates"
import { getProjectStatus } from "../helpers"

export const ProjectsTable = ({
  projects,
  users,
}: {
  projects: Project[]
  users: User[]
}) => {
  const getUserName = (id: string) => {
    const user = users.find((user) => user.id === id)

    return user ? `${user.firstname} ${user.lastname}` : ""
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>A cargo</TableHead>
          <TableHead>Fecha de inicio</TableHead>
          <TableHead>Fecha de fin</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell className="font-medium">{project.name}</TableCell>
            <TableCell>{project.description.slice(0, 50)}</TableCell>
            <TableCell>{getProjectStatus(project.status)}</TableCell>
            <TableCell>{getUserName(project.inCharge)}</TableCell>
            <TableCell>{utcToLocalDate(project.startDate)}</TableCell>
            <TableCell>{utcToLocalDate(project.endDate)}</TableCell>
            <TableCell className="text-right">
              <ProjectTableActions project={project} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
