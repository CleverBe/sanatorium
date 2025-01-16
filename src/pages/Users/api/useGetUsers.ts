import { useQuery } from "@tanstack/react-query"
import { usersKeys } from "./querykeys"
import { User, UserApi } from "../types"
import { api } from "@/lib/axios"

export const getUsersFn = async (): Promise<User[]> => {
  const { data } = await api.get<UserApi[]>("/usuarios/")

  return data.map((user) => ({
    id: user.id,
    name: user.nombre,
    email: user.email,
    role: user.rol,
    image: user.image,
  }))
}

export const useGetUsers = () => {
  return useQuery({
    queryFn: getUsersFn,
    queryKey: usersKeys.lists(),
  })
}
