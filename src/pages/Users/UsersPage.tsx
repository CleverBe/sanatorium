import { Button } from "@/components/ui/button"
import { useGetUsers } from "./api/useGetUsers"
import { UsersTable } from "./components/UsersTable"
import { SkeletonTable } from "@/components/SkeletonTable"
import { useUserModal } from "./hooks/useUserModal"
import { UserModal } from "./components/UserModal"

export const UsersPage = () => {
  const { data: users = [], isLoading } = useGetUsers()
  const modalUser = useUserModal()

  return (
    <div>
      <div className="mt-4 flex flex-wrap items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold">Administrar usuarios</h1>

        <Button
          onClick={() => {
            modalUser.onOpen()
          }}
          className="max-w-xs"
        >
          Agregar usuario
        </Button>
      </div>

      <div className="mt-4">
        {isLoading ? (
          <SkeletonTable withSearchInput />
        ) : (
          <UsersTable users={users} />
        )}
      </div>
      <UserModal />
    </div>
  )
}
