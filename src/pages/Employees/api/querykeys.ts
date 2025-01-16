export const employeesKeys = {
  all: ["employees"] as const,
  lists: () => [...employeesKeys.all, "list"] as const,
  list: (id: number) => [...employeesKeys.lists(), { id }] as const,
  manager: (id: number) => [...employeesKeys.lists(), "manager", id] as const,
}
