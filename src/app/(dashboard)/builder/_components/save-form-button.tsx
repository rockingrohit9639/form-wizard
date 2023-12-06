'use client'

import { SaveIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useWizardStore } from '@/stores'
import { trpc } from '@/lib/trpc/client'

export default function SaveFormButton({ id }: { id: string }) {
  const fields = useWizardStore((state) => state.fields)
  const { toast } = useToast()

  const updateFormFieldsMutation = trpc.form.updateFormFields.useMutation({
    onSuccess: () => {
      toast({ title: 'Success', description: 'Form saved successfully!', variant: 'success' })
    },
  })

  const saveForm = () => {
    const stringifiedFields = JSON.stringify(fields)
    updateFormFieldsMutation.mutate({ id, fields: stringifiedFields })
  }

  return (
    <Button variant="outline" loading={updateFormFieldsMutation.isLoading} onClick={saveForm}>
      <SaveIcon className="mr-2 h-4 w-4" />
      Save
    </Button>
  )
}
