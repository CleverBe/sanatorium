export const myProjectTasksKeys = {
  all: ["my-project-tasks"] as const,
  detail: (projectId: number) =>
    [...myProjectTasksKeys.all, "detail", projectId] as const,
}

export const userTasksKeys = {
  all: ["user-tasks"] as const,
  list: (userId: number) => [...userTasksKeys.all, userId] as const,
}
