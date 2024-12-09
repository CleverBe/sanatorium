import { ModalT } from "@/types"
import { create } from "zustand"
import { Employee } from "../types"

export const useEmployeeModal = create<ModalT<Employee>>((set) => ({
  item: null,
  isOpen: false,
  onOpen: (item) => set({ isOpen: true, item }),
  onClose: () => set({ isOpen: false, item: null }),
}))
