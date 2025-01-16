import { ModalT } from "@/types"
import { create } from "zustand"
import { ProjectWithoutInCharge } from "../../types"

export const useManagerProjectModal = create<ModalT<ProjectWithoutInCharge>>(
  (set) => ({
    item: null,
    isOpen: false,
    onOpen: (item) => set({ isOpen: true, item }),
    onClose: () => set({ isOpen: false, item: null }),
  }),
)
