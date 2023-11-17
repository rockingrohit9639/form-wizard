import { FileUpIcon } from 'lucide-react'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
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
import { publishForm } from '@/actions/form'

export default function PublishFormButton({ id }: { id: string }) {
  const [loading, startTransition] = useTransition()
  const { toast } = useToast()
  const router = useRouter()

  const publishNewForm = async () => {
    try {
      await publishForm(id)

      toast({ title: 'Success', description: 'You form is available to the public!', variant: 'success' })

      router.refresh()
    } catch {
      toast({ title: 'Error', description: 'Something went wrong while publishing the form!', variant: 'destructive' })
    }
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
            disabled={loading}
            onClick={(e) => {
              e.preventDefault()
              startTransition(publishNewForm)
            }}
          >
            Proceed
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
