import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query"
import { userProfileKeys } from "./querykeys"
import { RoleEnum, User } from "@/pages/Users/types"
import { api } from "@/lib/axios"

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
  const { data: response } = await api.get<IGetMeResponse>("/me/")

  return {
    id: response.id,
    name: response.nombre,
    email: response.email,
    role: response.rol,
    image: undefined,
  }
}

// TODO
// SACAR CAPTURA DE PANTALLA DE CHART
// ARREGLAR RESPONSIVE
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
