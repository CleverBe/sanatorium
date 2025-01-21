import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query"
import { userProfileKeys } from "./querykeys"
import { RoleEnum, User } from "@/pages/Users/types"
import { mockedUsers } from "@/db/db"

export interface IGetMeResponse {
  id: number
  nombre: string
  email: string
  rol: RoleEnum
  created_at: string
  updated_at: string
  encargado: {
    id: number
    nombre: string
    email: string
    rol: RoleEnum
  } | null
}

export const getCurrentUserFn = async (): Promise<User> => {
  // const { data: response } = await api.get<IGetMeResponse>("/me/")
  const userId = localStorage.getItem("accessToken")
  const foundUser = mockedUsers.find((u) => u.id === Number(userId))
  if (!foundUser) throw new Error("no se encontro el usuario")
  const response = {
    id: foundUser.id,
    nombre: foundUser.name,
    email: foundUser.email,
    rol: foundUser.role,
    image: foundUser.image,
  }

  return {
    id: response.id,
    name: response.nombre,
    email: response.email,
    role: response.rol,
    image: response.image,
  }
}

//TODO
// AÑADIR IMAGEN DE FONDO
// REMOVER REPORTES SIDEBAR EMPLEADO
// PERFIL EN SIDEBAR
// SACAR CAPTURA DE PANTALLA DE CHART
// ARREGLAR RESPONSIVE
// JWT Y CURRENT USER
// COMENTARIOS
// FECHAS EN CHARTS

export const useGetCurrentUser = (
  options?: Partial<UseQueryOptions<User>>,
): UseQueryResult<User> => {
  return useQuery({
    queryKey: userProfileKeys.current,
    queryFn: getCurrentUserFn,
    ...options,
  })
}
