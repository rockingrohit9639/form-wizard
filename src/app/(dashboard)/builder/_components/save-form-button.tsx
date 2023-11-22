import { SaveIcon } from 'lucide-react'
import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { updateFormContent } from '@/actions/form'
import { useWizardStore } from '@/stores'

export default function SaveFormButton({ id }: { id: string }) {
  const fields = useWizardStore((state) => state.fields)
  const { toast } = useToast()
  const [loading, startTransition] = useTransition()

  const saveForm = async () => {
    try {
      const stringifiedFields = JSON.stringify(fields)
      await updateFormContent(id, stringifiedFields)

      toast({ title: 'Success', description: 'Form saved successfully!', variant: 'success' })
    } catch {
      toast({ title: 'Error', description: 'Something went wrong while saving the form!', variant: 'destructive' })
    }
  }

  return (
    <Button
      variant="outline"
      disabled={loading}
      onClick={() => {
        startTransition(saveForm)
      }}
    >
      <SaveIcon className="mr-2 h-4 w-4" />
      Save
    </Button>
  )
}
