export const userUserProjectsKeys = {
  all: ["userProjects"],
  list: (userId: string) => [...userUserProjectsKeys.all, userId],
}
