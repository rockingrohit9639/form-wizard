import { SaveIcon } from 'lucide-react'
import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import useWizard from '@/hooks/use-wizard'
import { useToast } from '@/components/ui/use-toast'
import { updateFormContent } from '@/actions/form'

export default function SaveFormButton({ id }: { id: string }) {
  const { fields } = useWizard()
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
