import { create } from 'zustand'
import { FieldInstance } from '@/types/form'

export type WizardState = {
  fields: FieldInstance[]
  setFields: (fields: FieldInstance[]) => void
  addField: (index: number, field: FieldInstance) => void
  removeField: (id: string) => void
  updateField: (id: string, field: FieldInstance) => void

  selectedField: FieldInstance | null
  setSelectedField: (field: FieldInstance | null) => void
}

export const useWizardStore = create<WizardState>((set) => ({
  /** States */
  fields: [],
  selectedField: null,

  /** Setting Functions */
  setFields: (fields) => set({ fields }),
  addField: (index, field) =>
    set((state) => {
      const newFields = [...state.fields]
      newFields.splice(index, 0, field)
      return { ...state, fields: newFields }
    }),
  removeField: (id) => set((state) => ({ fields: state.fields.filter((field) => field.id !== id) })),
  updateField: (id, field) =>
    set((state) => ({ ...state, fields: state.fields.map((f) => (f.id === id ? field : f)) })),
  setSelectedField: (field) => set({ selectedField: field }),
}))
