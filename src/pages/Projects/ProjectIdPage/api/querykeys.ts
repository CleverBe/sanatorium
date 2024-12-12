export const myProjectTasksKeys = {
  all: ["my-project-tasks"] as const,
  detail: (projectId: string) =>
    [...myProjectTasksKeys.all, "detail", projectId] as const,
}

export const userTasksKeys = {
  all: ["user-tasks"] as const,
  list: (userId: string) => [...userTasksKeys.all, userId] as const,
}
