import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetUsers } from "./api/useGetUsers";
import { UsersTable } from "./Components/UsersTable";
import { SkeletonTable } from "@/components/SkeletonTable";
import { useUserModal } from "./hooks/useUserModal";
import { UserModal } from "./Components/UserModal";

export const UsersPage = () => {
  const { data: users = [], isLoading } = useGetUsers();
  const modalUser = useUserModal();

  return (
    <div>
      <h1 className="text-2xl font-bold">Administrar usuarios</h1>

      <div className="mt-4 flex justify-between">
        <Input type="text" placeholder="Buscar..." className="max-w-xs" />

        <Button
          onClick={() => {
            modalUser.onOpen();
          }}
        >
          Agregar
        </Button>
      </div>

      <div className="mt-4">
        {isLoading ? <SkeletonTable /> : <UsersTable users={users} />}
      </div>
      <UserModal />
    </div>
  );
};
