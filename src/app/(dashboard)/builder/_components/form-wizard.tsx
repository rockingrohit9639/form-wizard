'use client'

import { Form } from '@prisma/client'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { Loader2Icon } from 'lucide-react'
import PreviewDialogButton from './preview-dialog-button'
import SaveFormButton from './save-form-button'
import PublishFormButton from './publish-form-button'
import Wizard from './wizard'
import DragOverlayWrapper from './drag-overlay-wrapper'
import useWizard from '@/hooks/use-wizard'

type FormWizardProps = {
  form: Form
}

export default function FormWizard({ form }: FormWizardProps) {
  const { setFields } = useWizard()
  const [isReady, setIsReady] = useState(false) // to avoid delay while rendering

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

  useEffect(
    function updateFieldsOnMount() {
      if (isReady) return

      const jsonFields = JSON.parse(form.content)
      setFields(jsonFields)

      const readyTimeout = setTimeout(() => {
        setIsReady(true)
      }, 500)

      return () => {
        clearTimeout(readyTimeout)
      }
    },
    [form.content, isReady, setFields],
  )

  if (!isReady) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Loader2Icon className="animate-spin" />
      </div>
    )
  }

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
                <SaveFormButton id={form.id} />
                <PublishFormButton />
              </>
            ) : null}
          </div>
        </nav>

        <div className="relative flex h-48 w-full flex-grow items-center justify-center overflow-y-auto bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
          <Wizard />
        </div>
      </main>

      <DragOverlayWrapper />
    </DndContext>
  )
}
