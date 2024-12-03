import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "../Types";
import { UserTableActions } from "./UserTableActions";

export const UsersTable = ({ users }: { users: User[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Apellido</TableHead>
          <TableHead>Correo electrónico</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.firstname}</TableCell>
            <TableCell>{user.lastname}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.status}</TableCell>
            <TableCell className="text-right">
              <UserTableActions user={user} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
