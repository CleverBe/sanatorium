import { sleepAppWithData } from "@/helpers/sleep";
import { LoginInput } from "../schemas/LoginSchema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export interface ILoginResponse {
  status: string;
  accessToken: string;
}

export const loginUserFn = async (user: LoginInput) => {
  //   const response = await myAxios.post<ILoginResponse>("auth/login", user);

  //   return response.data;

  return sleepAppWithData(1000, user).then((user) => {
    if (
      user.email === "cleverbernal123@gmail.com" &&
      user.password === "1234"
    ) {
      return {
        status: "success",
        accessToken: "1234",
      };
    } else {
      throw new Error("Credenciales incorrectas");
    }
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUserFn,
    onSuccess: (data) => {
      if (data.status === "success") {
        toast.success("Ingresaste con exito");
      }
    },
    onError: () => {
      toast.error("Credenciales incorrectas");
    },
  });
};
