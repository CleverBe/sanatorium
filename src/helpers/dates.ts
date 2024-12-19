import { parseISO, format } from "date-fns"

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
