import { sleepAppWithData } from "@/helpers/sleep";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CreateUserInput } from "../schemas/UserSchema";
import { usersKeys } from "./querykeys";

export const createUserFn = ({ data }: { data: CreateUserInput }) => {
  return sleepAppWithData(1000, data).then((data) => {
    return data;
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });

      toast.success(
        `Usuario ${data.firstname} ${data.lastname} creado con exito`,
      );
    },
    onError: () => {
      toast.error("Error al crear");
    },
  });
};
