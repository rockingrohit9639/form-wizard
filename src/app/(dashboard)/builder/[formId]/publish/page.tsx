'use client'

import { LinkIcon, UploadIcon } from 'lucide-react'
import { match } from 'ts-pattern'
import { trpc } from '@/lib/trpc/client'
import Loading from '@/components/ui/loading'
import { ErrorMessage } from '@/components/ui/error-message'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

export default function Publish({ params }: { params: { formId: string } }) {
  const { toast } = useToast()
  const formDetailsQuery = trpc.form.findById.useQuery(params.formId)

  const publishFormMutation = trpc.form.publishForm.useMutation({
    onError: (error) => {
      toast({ title: 'Failed', description: error.message, variant: 'destructive' })
    },
    onSuccess: () => {
      formDetailsQuery.refetch()

      toast({ title: 'Success', description: 'Your form has been published successfully!', variant: 'success' })
    },
  })

  return match(formDetailsQuery)
    .with({ status: 'loading' }, () => <Loading title="Fetching form details..." />)
    .with({ status: 'error' }, ({ error }) => <ErrorMessage title="Error" description={error.message} />)
    .with({ status: 'success' }, ({ data: formDetails }) => (
      <div className="container mx-auto space-y-4 p-4">
        <div className="rounded-md border p-4">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary">
              <UploadIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold uppercase">Publish your form</h1>
              <p className="text-sm text-muted-foreground">
                Your users will be able to fill this form after it is published
              </p>
            </div>
          </div>

          <div className="mb-4">
            <div>
              Form name - <span className="font-bold">{formDetails.name}</span>
            </div>

            <div className="text-sm text-muted-foreground">{formDetails.description}</div>
          </div>

          {!formDetails.published ? (
            <Button
              disabled={formDetails.published || publishFormMutation.isLoading}
              loading={publishFormMutation.isLoading}
              onClick={() => {
                publishFormMutation.mutate(formDetails.id)
              }}
            >
              Publish now
            </Button>
          ) : null}
        </div>

        {formDetails.published ? (
          <div className="rounded-md border p-4">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary">
                <LinkIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold uppercase">direct link to your form</h1>
                <p className="text-sm text-muted-foreground">
                  Your form is securely published and ready to use at this address
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-sm bg-muted p-4">
              <LinkIcon className="h-5 w-5 text-primary" />
              <p className="select-all text-sm">{`${window.location.origin}/submit/${formDetails.shareUrl}`}</p>
            </div>
          </div>
        ) : null}
      </div>
    ))
    .exhaustive()
}
