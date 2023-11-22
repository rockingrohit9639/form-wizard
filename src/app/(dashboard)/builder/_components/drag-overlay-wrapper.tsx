import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import { useState } from 'react'
import { FormFieldOverlay } from './form-field'
import { FieldTypes } from '@/types/form'
import { FORM_FIELDS } from '@/lib/form'
import { useWizardStore } from '@/stores'

export default function DragOverlayWrapper() {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null)
  const fields = useWizardStore((state) => state.fields)

  useDndMonitor({
    onDragStart(event) {
      setDraggedItem(event.active)
    },
    onDragCancel() {
      setDraggedItem(null)
    },
    onDragEnd() {
      setDraggedItem(null)
    },
  })

  if (!draggedItem) return null
  let node = <div>No drag overlay</div>
  const type = draggedItem.data.current?.type as FieldTypes

  /** In case, if the field is dragged from the sidebar */
  const isFormField = draggedItem.data.current?.isFormField
  if (isFormField) {
    node = <FormFieldOverlay field={FORM_FIELDS[type]} />
  }

  /** In case, if the field is dragged inside designer */
  const isWizardField = draggedItem.data.current?.isWizardField
  if (isWizardField) {
    const fieldId = draggedItem.data?.current?.fieldId
    const field = fields.find((field) => field.id === fieldId)
    if (!field) {
      node = <div>Element not found</div>
    } else {
      const WizardField = FORM_FIELDS[type].wizardField
      node = (
        <div className="pointer-events-none flex w-full rounded-md border bg-accent px-4 py-4 opacity-80">
          <WizardField field={field} />
        </div>
      )
    }
  }

  return <DragOverlay>{node}</DragOverlay>
}
