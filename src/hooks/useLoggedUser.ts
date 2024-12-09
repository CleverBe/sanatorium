import { RoleEnum } from "@/pages/Users/types"
import { create } from "zustand"

export type LogUser = {
  id: string
  name: string
  email: string
  role: RoleEnum
  image: string
}

export type UseAuthUserType = {
  user: LogUser | null
  setUser: (user: LogUser | null) => void
}

export const useAuth = create<UseAuthUserType>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))
