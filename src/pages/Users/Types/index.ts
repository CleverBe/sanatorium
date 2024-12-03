export enum Role {
  ADMIN = "Administrador",
  MANAGER = "Manager",
  EMPLOYEE = "Empleado",
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  status: boolean;
  role: Role;
}
