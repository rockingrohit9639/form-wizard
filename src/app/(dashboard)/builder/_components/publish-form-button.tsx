import { FileUpIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useToast } from '@/components/ui/use-toast'
import { trpc } from '@/lib/trpc/client'

export default function PublishFormButton({ id }: { id: string }) {
  const { toast } = useToast()

  const publishFormMutation = trpc.form.publishForm.useMutation({
    onSuccess: () => {
      toast({ title: 'Success', description: 'You form is available to the public!', variant: 'success' })
    },
    onError: () => {
      toast({ title: 'Error', description: 'Something went wrong while publishing the form!', variant: 'destructive' })
    },
  })

  const handlePublishForm = async () => {
    publishFormMutation.mutate(id)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          <FileUpIcon className="mr-2 h-4 w-4" />
          Publish
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. After publishing you will not be able to edit this form.
            <br />
            <br />
            <span className="font-medium">
              By publishing this form you will make it available to the public and you will be able to collect
              submissions.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              handlePublishForm()
            }}
            asChild
          >
            <Button loading={publishFormMutation.isLoading}>Proceed</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
