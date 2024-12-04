export const projectsKeys = {
  all: ["projects"] as const,
  lists: () => [...projectsKeys.all, "list"] as const,
  list: (id: string) => [...projectsKeys.lists(), { id }] as const,
}
