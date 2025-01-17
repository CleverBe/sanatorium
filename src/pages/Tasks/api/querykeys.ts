export const tasksKeys = {
  all: ["tasks"] as const,
  lists: () => [...tasksKeys.all, "lists"] as const,
  byId: (taskId: number) => [...tasksKeys.all, "id", taskId] as const,
  project: (projectId: number) =>
    [...tasksKeys.all, "project", projectId] as const,
  employee: (employeeId: number) =>
    [...tasksKeys.all, "employee", employeeId] as const,
  projectAndEmployee: (projectId: number, employeeId: number) =>
    [...tasksKeys.all, "project", projectId, "employee", employeeId] as const,
}
