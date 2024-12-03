export const usersKeys = {
  all: ["users"] as const,
  lists: () => [...usersKeys.all, "list"] as const,
  list: (id: string) => [...usersKeys.lists(), { id }] as const,
};
