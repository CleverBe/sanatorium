export const employeesKeys = {
  all: ["employees"] as const,
  lists: () => [...employeesKeys.all, "list"] as const,
  list: (id: string) => [...employeesKeys.lists(), { id }] as const,
}
