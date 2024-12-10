import { Project } from "@/pages/Projects/types"
import { ModalT } from "@/types"
import { create } from "zustand"

export const useProjectDetail = create<ModalT<Project>>((set) => ({
  item: null,
  isOpen: false,
  onOpen: (item) => set({ isOpen: true, item }),
  onClose: () => set({ isOpen: false, item: null }),
}))
