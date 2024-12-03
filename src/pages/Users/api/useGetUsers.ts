import { sleepApp } from "@/helpers/sleep";
import { useQuery } from "@tanstack/react-query";
import { usersKeys } from "./querykeys";
import { Role, User } from "../Types";

export const getUsersFn = async () => {
  return sleepApp(1000).then(() => {
    const users: User[] = [
      {
        id: "1",
        firstname: "John",
        lastname: "Doene",
        email: "jdoe@me.com",
        status: true,
        role: Role.ADMIN,
      },
      {
        id: "2",
        firstname: "Jane",
        lastname: "Doeene",
        email: "jadedoe@me.com",
        status: false,
        role: Role.ADMIN,
      },
      {
        id: "3",
        firstname: "John",
        lastname: "Smith",
        email: "jsmith@me.com",
        status: true,
        role: Role.ADMIN,
      },
    ];
    return users;
  });
};

export const useGetUsers = () => {
  return useQuery({
    queryFn: getUsersFn,
    queryKey: usersKeys.lists(),
  });
};
