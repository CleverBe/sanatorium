import { createContext, useContext, useState } from "react"

export type FiltersType = Record<string, string>

interface FilterContextType {
  filters: FiltersType
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filters, setFilters] = useState<FiltersType>({})

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilters = (): FilterContextType => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error("useFilters debe usarse dentro de un FilterProvider")
  }
  return context
}
