import { Project, ProjectStatusEnum } from "@/pages/Projects/types"
import { RoleEnum, User } from "@/pages/Users/types"

export const defaultImageUrl =
  "https://res.cloudinary.com/dldf8bt5g/image/upload/v1686697003/Users/default_user_jr8kfs.png"

export const managerUsers: User[] = [
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
]

export const adminUsers: User[] = [
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
]

export const employeeUsers: User[] = [
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

export const mockedUsers: User[] = [
  ...managerUsers,
  ...adminUsers,
  ...employeeUsers,
]

export const mockedProjects: Project[] = [
  {
    id: "be83948f-4a5f-43f8-a0fd-fc94b471c4d8",
    name: "Proyecto 1",
    description: "Descripcion 1",
    status: ProjectStatusEnum.PENDING,
    inCharge: managerUsers[0].id,
    startDate: "2024-12-01T21:30:00.000Z",
    endDate: "2025-02-01T21:30:00.000Z",
    employees: [employeeUsers[0].id, employeeUsers[1].id],
    createdAt: "2022-01-01T21:30:00.000Z",
    updatedAt: "2022-01-01T21:30:00.000Z",
  },
  {
    id: "fb406199-5c02-4409-bf33-1624367511f8",
    name: "Proyecto 2",
    description: "Descripcion 2",
    status: ProjectStatusEnum.IN_PROGRESS,
    inCharge: managerUsers[0].id,
    startDate: "2024-12-01T21:30:00.000Z",
    endDate: "2025-02-10T21:30:00.000Z",
    employees: [employeeUsers[0].id],
    createdAt: "2022-01-01T21:30:00.000Z",
    updatedAt: "2022-01-01T21:30:00.000Z",
  },
  {
    id: "17e863dd-82eb-4f32-bf5c-e8b8b8bd9e9d",
    name: "Proyecto 3",
    description: "Descripcion 3",
    status: ProjectStatusEnum.COMPLETED,
    inCharge: managerUsers[1].id,
    startDate: "2024-11-01T21:30:00.000Z",
    endDate: "2025-12-01T21:30:00.000Z",
    employees: [employeeUsers[1].id],
    createdAt: "2022-01-01T21:30:00.000Z",
    updatedAt: "2022-01-01T21:30:00.000Z",
  },
]
