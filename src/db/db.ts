import { defaultImageUrl } from "@/constants"
import { RoleEnum, User } from "@/pages/Users/types"

export const managerUsers: User[] = [
  {
    id: 16,
    name: "Jhonatan",
    email: "jhonatan@gmail.com",
    role: RoleEnum.MANAGER,
    image: defaultImageUrl,
  },
]

export const adminUsers: User[] = [
  {
    id: 4,
    name: "Luis Miguel",
    email: "lucho@gmail.com",
    role: RoleEnum.ADMIN,
    image: defaultImageUrl,
  },
]

export const employeeUsers: User[] = [
  {
    id: 3,
    name: "Pablo",
    email: "paoly@gmail.com",
    role: RoleEnum.EMPLOYEE,
    image: defaultImageUrl,
  },
]

export const mockedUsers: User[] = [
  ...managerUsers,
  ...adminUsers,
  ...employeeUsers,
]
