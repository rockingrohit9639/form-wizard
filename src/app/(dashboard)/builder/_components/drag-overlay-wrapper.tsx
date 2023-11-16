import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import { useState } from 'react'
import { FormFieldOverlay } from './form-field'
import { FORM_FIELDS, FieldTypes } from '@/types/form'

export default function DragOverlayWrapper() {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null)

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

  const isFormField = draggedItem.data.current?.isFormField

  if (isFormField) {
    const type = draggedItem?.data?.current?.type as FieldTypes

    node = <FormFieldOverlay field={FORM_FIELDS[type]} />
  }

  return <DragOverlay>{node}</DragOverlay>
}
