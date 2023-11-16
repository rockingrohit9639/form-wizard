'use client'

import { useDndMonitor, useDroppable } from '@dnd-kit/core'
import DesignerSidebar from './designer-sidebar'
import { cn } from '@/lib/utils'
import { FORM_FIELDS, FieldInstance, FieldTypes } from '@/types/form'
import useDesigner from '@/hooks/use-designer'
import { generateRandomId } from '@/lib/id'

export default function Designer() {
  const { fields, addField } = useDesigner()

  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: {
      isDesignedDropArea: true,
    },
  })

  useDndMonitor({
    onDragEnd(event) {
      const { active, over } = event
      if (!active || !over) return

      const isFormField = active.data.current?.isFormField

      if (isFormField) {
        const type = active.data.current?.type as FieldTypes
        const newField = FORM_FIELDS[type].construct(generateRandomId())

        addField(0, newField)
      }
    },
  })

  return (
    <div className="flex h-full w-full">
      <div className="w-full p-4">
        <div
          ref={droppable.setNodeRef}
          className={cn(
            'mx-auto flex h-full max-w-4xl flex-1 flex-grow-0 flex-col items-center justify-start overflow-y-auto rounded-md bg-background',
            { 'ring-2 ring-primary/20': droppable.isOver },
          )}
        >
          {!droppable.isOver && fields.length === 0 ? (
            <div className="flex flex-grow items-center text-3xl font-bold text-muted-foreground">Drop here</div>
          ) : null}

          {droppable.isOver ? (
            <div className="w-full p-4">
              <div className="h-28 rounded-md bg-primary/20" />
            </div>
          ) : null}

          {fields.length > 0 ? (
            <div className="flex w-full flex-col gap-2 p-4 text-background">
              {fields.map((field) => (
                <FieldWrapper key={field.id} field={field} />
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <DesignerSidebar />
    </div>
  )
}

function FieldWrapper({ field }: { field: FieldInstance }) {
  const DesignerField = FORM_FIELDS[field.type].designerField

  return <DesignerField />
}
