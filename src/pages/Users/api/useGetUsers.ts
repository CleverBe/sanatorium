import { sleepApp } from "@/helpers/sleep"
import { useQuery } from "@tanstack/react-query"
import { usersKeys } from "./querykeys"
import { RoleEnum, User } from "../types"

export const defaultImageUrl =
  "https://res.cloudinary.com/dldf8bt5g/image/upload/v1686697003/Users/default_user_jr8kfs.png"

export const mockedUsers: User[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    firstname: "John",
    lastname: "Doene",
    email: "jdoe@me.com",
    status: true,
    role: RoleEnum.MANAGER,
    image: defaultImageUrl,
  },
  {
    id: "acde070d-8c4c-4f0d-9d8a-162843c10333",
    firstname: "Jane",
    lastname: "Doeene",
    email: "jadedoe@me.com",
    status: false,
    role: RoleEnum.MANAGER,
    image: defaultImageUrl,
  },
  {
    id: "ef7bb557-da54-4da0-b917-2376012654d1",
    firstname: "John",
    lastname: "Smith",
    email: "jsmith@me.com",
    status: true,
    role: RoleEnum.ADMIN,
    image: defaultImageUrl,
  },
  {
    id: "ce5a5670-85d1-4572-9591-66dd2a6ea1b7",
    firstname: "Carlos",
    lastname: "Rodriguez",
    email: "carlosRodriguez@me.com",
    status: true,
    role: RoleEnum.ADMIN,
    image: defaultImageUrl,
  },
  {
    id: "6c16ad98-91e9-4639-a5b4-6b841036b78b",
    firstname: "Pepito",
    lastname: "Perez",
    email: "pepitoPerez@me.com",
    status: true,
    role: RoleEnum.EMPLOYEE,
    image: defaultImageUrl,
  },
  {
    id: "4dfe4f7a-5bc3-4bd9-b703-0e08ec84a57a",
    firstname: "Luis",
    lastname: "Lopez",
    email: "luisLopez@me.com",
    status: true,
    role: RoleEnum.EMPLOYEE,
    image: defaultImageUrl,
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
