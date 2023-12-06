import { RedoIcon, UndoIcon } from 'lucide-react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useTemporalStore } from '@/stores'
import { cn } from '@/lib/utils'
import SaveFormButton from './save-form-button'

type WizardMenuProps = {
  className?: string
  style?: React.CSSProperties
}

export default function WizardMenu({ className, style }: WizardMenuProps) {
  const { undo, redo, futureStates } = useTemporalStore((state) => state)
  const { formId } = useParams<{ formId: string }>()

  useHotkeys('ctrl+z', () => {
    undo()
  })

  useHotkeys('ctrl+alt+z', () => {
    undo()
  })

  return (
    <div className={cn('flex w-full items-center justify-end gap-2 border-b px-4 py-2', className)} style={style}>
      <SaveFormButton id={formId} />

      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          undo()
        }}
      >
        <UndoIcon className="h-4 w-4 text-muted-foreground" />
      </Button>
      <Button
        disabled={futureStates.length === 0}
        variant="ghost"
        size="icon"
        onClick={() => {
          redo()
        }}
      >
        <RedoIcon className="h-4 w-4 text-muted-foreground" />
      </Button>
    </div>
  )
}
