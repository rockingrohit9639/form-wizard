'use client'

import { createContext, useState } from 'react'
import { FieldInstance } from '@/types/form'

type DesignerContextType = {
  fields: FieldInstance[]
  addField: (index: number, field: FieldInstance) => void
}

export const DesignerContext = createContext<DesignerContextType | null>(null)

export default function DesignerContextProvider({ children }: { children: React.ReactNode }) {
  const [fields, setFields] = useState<FieldInstance[]>([])

  const addField = (index: number, field: FieldInstance) => {
    setFields((prev) => {
      const newFields = [...prev]
      newFields.splice(index, 0, field)
      return newFields
    })
  }

  return (
    <DesignerContext.Provider
      value={{
        fields,
        addField,
      }}
    >
      {children}
    </DesignerContext.Provider>
  )
}
