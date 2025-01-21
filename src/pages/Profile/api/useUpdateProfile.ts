import { usersKeys } from "@/pages/Users/api/querykeys"
import { updateUserFn } from "@/pages/Users/api/useUpdateUser"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { userProfileKeys } from "./querykeys"

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUserFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.all })
      queryClient.invalidateQueries({ queryKey: userProfileKeys.current })

      toast.success(`Se actualizó tu perfil con exito`)
    },
    onError: () => {
      toast.error("Error al actualizar")
    },
  })
}
