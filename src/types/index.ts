export type ModalT<ItemType> = {
  item: null | ItemType
  isOpen: boolean
  onOpen: (item?: ItemType) => void
  onClose: () => void
}

export interface Task {
  id: string
  code: string
  title: string
  description: string
}
