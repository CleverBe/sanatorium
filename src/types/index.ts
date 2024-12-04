export type ModalT<ItemType> = {
  item: null | ItemType
  isOpen: boolean
  onOpen: (item?: ItemType) => void
  onClose: () => void
}
