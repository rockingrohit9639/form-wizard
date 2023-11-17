'use client'

import { createContext, useState } from 'react'
import { FieldInstance } from '@/types/form'

type WizardContextType = {
  fields: FieldInstance[]
  setFields: React.Dispatch<React.SetStateAction<FieldInstance[]>>
  addField: (index: number, field: FieldInstance) => void
  removeField: (id: string) => void
  updateField: (id: string, field: FieldInstance) => void

  selectedField: FieldInstance | null
  setSelectedField: React.Dispatch<React.SetStateAction<FieldInstance | null>>
}

export const WizardContext = createContext<WizardContextType | null>(null)

export default function WizardContextProvider({ children }: { children: React.ReactNode }) {
  const [fields, setFields] = useState<FieldInstance[]>([])
  const [selectedField, setSelectedField] = useState<FieldInstance | null>(null)

  const addField = (index: number, field: FieldInstance) => {
    setFields((prev) => {
      const newFields = [...prev]
      newFields.splice(index, 0, field)
      return newFields
    })
  }

  const removeField = (id: string) => {
    setFields((prev) => prev.filter((field) => field.id !== id))
  }

  const updateField = (id: string, field: FieldInstance) => {
    setFields((prev) => prev.map((f) => (f.id === id ? field : f)))
  }

  return (
    <WizardContext.Provider
      value={{
        fields,
        addField,
        setFields,
        removeField,
        updateField,
        selectedField,
        setSelectedField,
      }}
    >
      {children}
    </WizardContext.Provider>
  )
}
