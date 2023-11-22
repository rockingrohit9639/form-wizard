import { ViewIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import ItemsRenderer from '@/components/items-renderer'
import { getItemsFromFields } from '@/lib/form'
import { useWizardStore } from '@/stores'

export default function PreviewDialogButton() {
  const fields = useWizardStore((state) => state.fields)

  const items = getItemsFromFields(fields)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <ViewIcon className="mr-2 h-4 w-4" />
          Preview
        </Button>
      </DialogTrigger>

      <DialogContent className="flex h-screen max-h-screen w-screen max-w-full flex-grow flex-col gap-0 p-0">
        <div className="mx-auto w-full max-w-screen-lg border-b px-4 py-2">
          <p className="text-lg font-bold text-muted-foreground">Form Preview</p>
          <p className="text-sm text-muted-foreground">This is how your form will look like to you users.</p>
        </div>

        <div className="flex flex-grow flex-col items-center justify-center bg-accent bg-[url(/paper.svg)] p-4 dark:bg-[url(/paper-dark.svg)]">
          <div className="flex h-full w-full max-w-screen-lg flex-grow flex-col gap-4 overflow-y-auto rounded-lg bg-background p-8">
            <ItemsRenderer items={items} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
