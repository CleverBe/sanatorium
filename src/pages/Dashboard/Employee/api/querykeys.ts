export const userUserProjectsKeys = {
  all: ["userProjects"],
  list: (userId: number) => [...userUserProjectsKeys.all, userId],
}
