'use client'

import { Form } from '@prisma/client'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon, Loader2Icon } from 'lucide-react'
import Link from 'next/link'
import Confetti from 'react-confetti'
import PreviewDialogButton from './preview-dialog-button'
import SaveFormButton from './save-form-button'
import PublishFormButton from './publish-form-button'
import Wizard from './wizard'
import DragOverlayWrapper from './drag-overlay-wrapper'
import useWizard from '@/hooks/use-wizard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

type FormWizardProps = {
  form: Form
}

export default function FormWizard({ form }: FormWizardProps) {
  const { setFields } = useWizard()
  const [isReady, setIsReady] = useState(false) // to avoid delay while rendering
  const { toast } = useToast()

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

  if (form.published) {
    const shareUrl = `${window.location.origin}/submit/${form.shareUrl}`

    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={1000} />
        <div className="max-w-md">
          <h1 className="mb-10 border-b pb-2 text-center text-4xl font-bold text-primary">🎊🎊 Form Published 🎊🎊</h1>
          <h2 className="text-2xl">Share this form</h2>
          <h3 className="border-b pb-10 text-xl text-muted-foreground">
            Anyone with this link can view and submit the form
          </h3>
          <div className="my-4 flex w-full flex-col items-center gap-2 border-b pb-4">
            <Input className="w-full" readOnly value={shareUrl} />
            <Button
              className="mt-2 w-full"
              onClick={() => {
                navigator.clipboard.writeText(shareUrl)
                toast({ title: 'Link copied successfully!', variant: 'success' })
              }}
            >
              Copy Link
            </Button>
          </div>
          <div className="flex justify-between">
            <Button variant="link" asChild>
              <Link href="/">
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Go back to home
              </Link>
            </Button>

            <Button variant="link" asChild>
              <Link href={`/forms/${form.id}`}>
                Form Details
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
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
                <PublishFormButton id={form.id} />
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
