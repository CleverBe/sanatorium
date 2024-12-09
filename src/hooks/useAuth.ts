import { create } from "zustand"

export type UseAuthUserType = {
  accessToken: string | null
  isLoggedIn: boolean
  setAccessToken: (accessToken: string | null) => void
}

export const useAuth = create<UseAuthUserType>((set) => ({
  accessToken: null,
  isLoggedIn: false,
  setAccessToken: (accessToken) =>
    set({ accessToken, isLoggedIn: !!accessToken }),
}))
