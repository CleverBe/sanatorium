import { parseISO, format, parse } from "date-fns"

export const utcToLocal = (utcDate: string) => {
  return format(parseISO(utcDate), "yyyy-MM-dd'T'HH:mm")
}

export const localToUTC = (localDate: string) => {
  const date = new Date(localDate)
  return date.toISOString()
}

export const utcToLocalDate = (utcDate: string) => {
  return format(parseISO(utcDate), "dd-MM-yyyy")
}

export const utcToLocalDateYYYYMMDD = (utcDate: string) => {
  return format(parseISO(utcDate), "yyyy-MM-dd")
}

// Example: 2023-05-01 -> 01-05-2023
export const formatDate = (fecha: string): string => {
  const fechaParseada = parse(fecha, "yyyy-MM-dd", new Date())
  return format(fechaParseada, "dd-MM-yyyy")
}
