import { ModalT } from "@/types"
import { create } from "zustand"
import { Project } from "../types"

export const useProjectModal = create<ModalT<Project>>((set) => ({
  item: null,
  isOpen: false,
  onOpen: (item) => set({ isOpen: true, item }),
  onClose: () => set({ isOpen: false, item: null }),
}))
