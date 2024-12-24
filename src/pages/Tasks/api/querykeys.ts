export const tasksKeys = {
  all: ["tasks"] as const,
  lists: () => [...tasksKeys.all, "lists"] as const,
}
