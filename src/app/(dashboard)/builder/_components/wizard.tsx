'use client'

import { useDndMonitor, useDraggable, useDroppable } from '@dnd-kit/core'
import { useState } from 'react'
import { TrashIcon } from 'lucide-react'
import invariant from 'tiny-invariant'
import WizardSidebar from './wizard-sidebar'
import { cn } from '@/lib/utils'
import { FieldInstance, FieldTypes } from '@/types/form'
import useWizard from '@/hooks/use-wizard'
import { generateRandomId } from '@/lib/id'
import { Button } from '@/components/ui/button'
import { FORM_FIELDS } from '@/lib/form'

export default function Wizard() {
  const { fields, addField, removeField, selectedField, setSelectedField } = useWizard()

  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: {
      isWizardDropArea: true,
    },
  })

  useDndMonitor({
    onDragEnd(event) {
      const { active, over } = event
      if (!active || !over) return

      const isFormField = active.data.current?.isFormField
      const isDroppingOverWizardDropArea = over.data?.current?.isWizardDropArea

      /**
       * Handling the case if the field is dropped in wizard area
       * and not over any existing field
       * */
      if (isFormField && isDroppingOverWizardDropArea) {
        const type = active.data.current?.type as FieldTypes
        const newField = FORM_FIELDS[type].construct(generateRandomId())

        addField(fields.length, newField)
        return
      }

      /**
       * Handling the case if the field is dropped over existing field
       */
      const isDroppingOverExistingFieldOnTopHalf = over.data?.current?.isTopHalf
      const isDroppingOverExistingFieldOnBottomHalf = over.data?.current?.isBottomHalf

      const isDroppingOverExistingField =
        isDroppingOverExistingFieldOnTopHalf || isDroppingOverExistingFieldOnBottomHalf

      if (isFormField && isDroppingOverExistingField) {
        const type = active.data.current?.type as FieldTypes
        const newField = FORM_FIELDS[type].construct(generateRandomId())
        const overId = over.data?.current?.fieldId

        const overFieldIndex = fields.findIndex((f) => f.id === overId)
        invariant(overFieldIndex !== -1, 'Field not found while dropping')

        let indexForNewField = overFieldIndex // assuming that it is on top half
        if (isDroppingOverExistingFieldOnBottomHalf) {
          indexForNewField = overFieldIndex + 1
        }

        addField(indexForNewField, newField)
      }

      /**
       * Handling the case if the user is dragging an existing field in wizard
       */
      const isDraggingWizardField = active.data?.current?.isWizardField
      if (isDraggingWizardField && isDroppingOverExistingField) {
        const activeId = active.data.current?.fieldId
        const overId = over.data.current?.fieldId

        const activeFieldIndex = fields.findIndex((f) => f.id === activeId)
        const overFieldIndex = fields.findIndex((f) => f.id === overId)

        invariant(activeFieldIndex !== -1 || overFieldIndex !== -1, 'Field not found')

        const activeField = { ...fields[activeFieldIndex] }
        removeField(activeId)

        let indexForNewField = overFieldIndex // assuming that it is on top half
        if (isDroppingOverExistingFieldOnBottomHalf) {
          indexForNewField = overFieldIndex + 1
        }

        addField(indexForNewField, activeField)
      }
    },
  })

  return (
    <div className="flex h-full w-full">
      <div
        className="w-full p-4"
        onClick={() => {
          if (selectedField) {
            setSelectedField(null)
          }
        }}
      >
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

          {droppable.isOver && fields.length === 0 ? (
            <div className="w-full p-4">
              <div className="h-28 rounded-md bg-primary/20" />
            </div>
          ) : null}

          {fields.length > 0 ? (
            <div className="flex w-full flex-col gap-2 p-4">
              {fields.map((field) => (
                <FieldWrapper key={field.id} field={field} />
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <WizardSidebar />
    </div>
  )
}

function FieldWrapper({ field }: { field: FieldInstance }) {
  const { removeField, setSelectedField } = useWizard()
  const [mouseIsOver, setMouseIsOver] = useState(false)

  const topHalf = useDroppable({
    id: field.id + '-top',
    data: {
      type: field.type,
      fieldId: field.id,
      isTopHalf: true,
    },
  })

  const bottomHalf = useDroppable({
    id: field.id + '-bottom',
    data: {
      type: field.type,
      fieldId: field.id,
      isBottomHalf: true,
    },
  })

  const draggable = useDraggable({
    id: field.id + '-drag-handler',
    data: {
      type: field.type,
      fieldId: field.id,
      isWizardField: true,
    },
  })

  if (draggable.isDragging) return null

  const WizardField = FORM_FIELDS[field.type].wizardField

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="relative flex cursor-grab flex-col rounded-md bg-accent/40 py-2 text-foreground ring-1 ring-inset ring-accent"
      onMouseEnter={() => {
        setMouseIsOver(true)
      }}
      onMouseLeave={() => {
        setMouseIsOver(false)
      }}
      onClick={(e) => {
        e.stopPropagation()
        setSelectedField(field)
      }}
    >
      <div className="absolute h-1/2 w-full rounded-t-md" ref={topHalf.setNodeRef} />

      {mouseIsOver ? (
        <>
          <div className="absolute right-0 top-0 z-10 h-full">
            <Button
              variant="outline"
              className="flex h-full items-center rounded-md rounded-l-none border bg-red-500"
              onClick={(e) => {
                e.stopPropagation()
                removeField(field.id)
              }}
            >
              <TrashIcon className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-sm text-muted-foreground">Click for properties or drag to move</p>
          </div>
        </>
      ) : null}

      {topHalf.isOver ? <div className="absolute top-0 h-2 w-full rounded-md rounded-b-none bg-primary" /> : null}
      <div
        className={cn('pointer-events-none flex w-full select-none items-center rounded-md px-4 py-2', {
          'opacity-30': mouseIsOver,
        })}
      >
        <WizardField field={field} />
      </div>
      <div className="absolute bottom-0 h-1/2 w-full rounded-b-md" ref={bottomHalf.setNodeRef} />
      {bottomHalf.isOver ? <div className="absolute bottom-0 h-2 w-full rounded-md rounded-t-none bg-primary" /> : null}
    </div>
  )
}
