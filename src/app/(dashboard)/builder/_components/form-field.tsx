import { cloneElement } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { Button } from '@/components/ui/button'
import { Field } from '@/types/form'
import { cn } from '@/lib/utils'

type FormFieldProps = {
  field: Field
}

export default function FormField({ field }: FormFieldProps) {
  const { icon, label } = field.designerButtonElement
  const draggable = useDraggable({
    id: `form-field-${field.type}`,
    data: {
      type: field.type,
      isFormField: true,
    },
  })

  return (
    <Button
      variant="outline"
      className={cn('flex h-32 w-32 cursor-grab flex-col gap-2 border-primary text-primary', {
        'ring-2 ring-primary': draggable.isDragging,
      })}
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      {cloneElement(icon, { className: 'w-8 h-8' })}
      <p className="text-xs ">{label}</p>
    </Button>
  )
}

export function FormFieldOverlay({ field }: FormFieldProps) {
  const { icon, label } = field.designerButtonElement

  return (
    <Button variant="outline" className="flex h-32 w-32 cursor-grab flex-col gap-2 border-primary text-primary">
      {cloneElement(icon, { className: 'w-8 h-8' })}
      <p className="text-xs ">{label}</p>
    </Button>
  )
}
