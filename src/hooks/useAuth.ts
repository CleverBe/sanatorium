import { create } from "zustand"

export type UseAuthUserType = {
  accessToken: string | null
  refreshToken: string | null
  saveTokens: (accessToken: string, refreshToken: string) => void
  clearTokens: () => void
}

export const useAuth = create<UseAuthUserType>((set) => ({
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  saveTokens: (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)

    set({ accessToken, refreshToken })
  },
  clearTokens: () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")

    set({ accessToken: null, refreshToken: null })
  },
}))
