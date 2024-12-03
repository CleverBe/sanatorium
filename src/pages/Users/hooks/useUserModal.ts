import { ModalT } from "@/types";
import { create } from "zustand";
import { User } from "../Types";

export const useUserModal = create<ModalT<User>>((set) => ({
  item: null,
  isOpen: false,
  onOpen: (item) => set({ isOpen: true, item }),
  onClose: () => set({ isOpen: false, item: null }),
}));
