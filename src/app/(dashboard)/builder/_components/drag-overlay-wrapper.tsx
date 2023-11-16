import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import { useState } from 'react'
import { FormFieldOverlay } from './form-field'
import { FORM_FIELDS, FieldTypes } from '@/types/form'
import useDesigner from '@/hooks/use-designer'

export default function DragOverlayWrapper() {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null)
  const { fields } = useDesigner()

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
  const isDesignerField = draggedItem.data.current?.isDesignerField
  if (isDesignerField) {
    const fieldId = draggedItem.data?.current?.fieldId
    const field = fields.find((field) => field.id === fieldId)
    if (!field) {
      node = <div>Element not found</div>
    } else {
      const DesignerField = FORM_FIELDS[type].designerField
      node = (
        <div className="pointer-events-none flex h-28 w-full rounded-md border bg-accent px-4 py-2 opacity-80">
          <DesignerField field={field} />
        </div>
      )
    }
  }

  return <DragOverlay>{node}</DragOverlay>
}
