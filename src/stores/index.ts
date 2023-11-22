import { create, useStore } from 'zustand'
import { TemporalState, temporal } from 'zundo'
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

export const useWizardStore = create<WizardState>()(
  temporal((set) => ({
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
  })),
)

export const useTemporalStore = <T>(
  selector: (state: TemporalState<WizardState>) => T,
  equality?: (a: T, b: T) => boolean,
) => useStore(useWizardStore.temporal, selector, equality)
