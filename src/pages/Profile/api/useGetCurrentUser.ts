import { sleepApp } from "@/helpers/sleep"
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query"
import { userProfileKeys } from "./querykeys"
import { User } from "@/pages/Users/types"
import { adminUsers, managerUsers, employeeUsers } from "@/db/db"

export const getCurrentUserFn = async () => {
  return await sleepApp(1000).then(() => {
    return employeeUsers[0]
  })
}

//TODO
// AÑADIR IMAGEN DE FONDO, ENVIAR IMAGEN DE PERFIL
// REMOVER REPORTES SIDEBAR EMPLEADO
// PERFIL EN SIDEBAR
// SACAR CAPTURA DE PANTALLA DE CHART
// REMOVER ARCHIVO DE TASK
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
