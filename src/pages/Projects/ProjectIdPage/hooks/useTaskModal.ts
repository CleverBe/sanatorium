import { Task } from "@/pages/Tasks/types"
import { ModalT } from "@/types"
import { create } from "zustand"

export const useTaskModal = create<ModalT<Task>>((set) => ({
  item: null,
  isOpen: false,
  onOpen: (item) => set({ isOpen: true, item }),
  onClose: () => set({ isOpen: false, item: null }),
}))
