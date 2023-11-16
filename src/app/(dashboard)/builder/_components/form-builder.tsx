'use client'

import { Form } from '@prisma/client'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import PreviewDialogButton from './preview-dialog-button'
import SaveFormButton from './save-form-button'
import PublishFormButton from './publish-form-button'
import Designer from './designer'
import DragOverlayWrapper from './drag-overlay-wrapper'

type FormBuilderProps = {
  form: Form
}

export default function FormBuilder({ form }: FormBuilderProps) {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px
    },
  })

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  })

  const sensors = useSensors(mouseSensor, touchSensor)

  return (
    <DndContext sensors={sensors}>
      <main className="flex w-full flex-col">
        <nav className="flex items-center justify-between gap-3 border-b-2 p-4">
          <h2 className="truncate font-medium">
            <span className="mr-2 text-muted-foreground">Form:</span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogButton />
            {!form.published ? (
              <>
                <SaveFormButton />
                <PublishFormButton />
              </>
            ) : null}
          </div>
        </nav>

        <div className="relative flex h-48 w-full flex-grow items-center justify-center overflow-y-auto bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
          <Designer />
        </div>
      </main>

      <DragOverlayWrapper />
    </DndContext>
  )
}
