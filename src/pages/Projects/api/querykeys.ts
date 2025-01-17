export const projectsKeys = {
  all: ["projects"] as const,
  lists: () => [...projectsKeys.all, "list"] as const,
  list: (id: number) => [...projectsKeys.lists(), { id }] as const,
  manager: (id: number) => [...projectsKeys.lists(), "manager", id] as const,
}
