import { sleepApp } from "@/helpers/sleep"
import { useQuery } from "@tanstack/react-query"
import { usersKeys } from "./querykeys"
import { RoleEnum, User } from "../types"

export const mockedUsers: User[] = [
  {
    id: "1",
    firstname: "John",
    lastname: "Doene",
    email: "jdoe@me.com",
    status: true,
    role: RoleEnum.MANAGER,
  },
  {
    id: "2",
    firstname: "Jane",
    lastname: "Doeene",
    email: "jadedoe@me.com",
    status: false,
    role: RoleEnum.MANAGER,
  },
  {
    id: "3",
    firstname: "John",
    lastname: "Smith",
    email: "jsmith@me.com",
    status: true,
    role: RoleEnum.ADMIN,
  },
  {
    id: "4",
    firstname: "Carlos",
    lastname: "Rodriguez",
    email: "carlosRodriguez@me.com",
    status: true,
    role: RoleEnum.ADMIN,
  },
]

export const getUsersFn = async (): Promise<User[]> => {
  return sleepApp(1000).then(() => {
    return mockedUsers
  })
}

export const useGetUsers = () => {
  return useQuery({
    queryFn: getUsersFn,
    queryKey: usersKeys.lists(),
  })
}
