export const usersKeys = {
  all: ["users"] as const,
  lists: () => [...usersKeys.all, "list"] as const,
  list: (id: number) => [...usersKeys.lists(), { id }] as const,
}
