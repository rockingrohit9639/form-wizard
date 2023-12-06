'use client'

import { match } from 'ts-pattern'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MousePointerClickIcon } from 'lucide-react'
import { FieldInstance } from '@/types/form'
import { trpc } from '@/lib/trpc/client'
import Loading from '@/components/ui/loading'
import { ErrorMessage } from '@/components/ui/error-message'
import { Form } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import { generateFieldsValidationSchema, getItemsFromFields } from '@/lib/form'
import ItemsRenderer from '@/components/items-renderer'
import { Button } from '@/components/ui/button'

type SubmissionSchema = Record<string, unknown>

export default function Submit({ params }: { params: { shareUrl: string } }) {
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const formDetailsQuery = trpc.form.findFormByShareUrl.useQuery(params.shareUrl)

  const fields = formDetailsQuery.data ? (JSON.parse(formDetailsQuery.data.content) as FieldInstance[]) : []
  const validationSchema = generateFieldsValidationSchema(fields)
  const form = useForm<SubmissionSchema>({
    resolver: zodResolver(validationSchema),
  })

  const submitFormMutation = trpc.form.submitForm.useMutation({
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Your submission has been recorded successfully!',
        variant: 'success',
      })
      setSubmitted(true)
    },
    onError: () => {
      toast({ title: 'Error', description: 'Something went wrong', variant: 'destructive' })
    },
  })

  const handleSubmit = async (values: SubmissionSchema) => {
    const stringifiedValues = JSON.stringify(values)
    submitFormMutation.mutate({
      shareUrl: params.shareUrl,
      fields: stringifiedValues,
    })
  }

  return match(formDetailsQuery)
    .returnType<React.ReactNode>()
    .with({ status: 'loading' }, () => <Loading title="Fetching form details!" />)
    .with({ status: 'error' }, () => <ErrorMessage description="Could not find form details!" />)
    .with({ status: 'success' }, () => {
      const items = getItemsFromFields(fields)

      if (submitted) {
        return (
          <div className="flex h-full w-full items-center justify-center p-8">
            <div className="flex w-full max-w-screen-md flex-col gap-4 border p-8 shadow-lg shadow-primary">
              <h1 className="text-2xl font-bold">Form Submitted</h1>
              <p className="text-muted-foreground">Thank you for you submission, you can close this page now.</p>
            </div>
          </div>
        )
      }

      return (
        <div className="flex h-full w-full items-center justify-center p-8">
          <Form {...form}>
            <form
              className="flex w-full max-w-screen-md flex-col gap-4 border p-8 shadow-lg shadow-primary"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <ItemsRenderer control={form.control} items={items} />

              <Button type="submit" loading={submitFormMutation.isLoading}>
                <MousePointerClickIcon className="mr-2 h-4 w-4" />
                Submit
              </Button>
            </form>
          </Form>
        </div>
      )
    })
    .exhaustive()
}
