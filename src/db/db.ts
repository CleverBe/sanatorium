import { RoleEnum, User } from "@/pages/Users/types"

export const defaultImageUrl =
  "https://res.cloudinary.com/dldf8bt5g/image/upload/v1686697003/Users/default_user_jr8kfs.png"

export const managerUsers: User[] = [
  {
    id: 16,
    name: "John",
    email: "jdoe@me.com",
    role: RoleEnum.MANAGER,
    image: defaultImageUrl,
  },
]

export const adminUsers: User[] = [
  {
    id: 4,
    name: "Carlos",
    email: "carlosRodriguez@me.com",
    role: RoleEnum.ADMIN,
    image: defaultImageUrl,
  },
]

export const employeeUsers: User[] = [
  {
    id: 3,
    name: "Pepito",
    email: "pepitoPerez@me.com",
    role: RoleEnum.EMPLOYEE,
    image: defaultImageUrl,
  },
]

export const mockedUsers: User[] = [
  ...managerUsers,
  ...adminUsers,
  ...employeeUsers,
]
