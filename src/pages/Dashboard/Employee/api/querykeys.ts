export const userUserProjectsKeys = {
  all: () => ["userProjects"],
  lists: () => [...userUserProjectsKeys.all(), "list"],
}
