import { sleepAppWithData } from "@/helpers/sleep"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { UpdateUserApiInput } from "../schemas/UserSchema"
import { usersKeys } from "./querykeys"

export const updateUserFn = ({ data }: { data: UpdateUserApiInput }) => {
  return sleepAppWithData(1000, data).then((data) => {
    return data
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUserFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() })

      toast.success(
        `Usuario ${data.firstname} ${data.lastname} actualizado con exito`,
      )
    },
    onError: () => {
      toast.error("Error al actualizar")
    },
  })
}
