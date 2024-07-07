'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SettingsIcon } from 'lucide-react'
import { match } from 'ts-pattern'
import { useEffect } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { UpdateFormInput, updateFormInput } from '@/server/api/form/form.input'
import { trpc } from '@/lib/trpc/client'
import Loading from '@/components/ui/loading'
import { ErrorMessage } from '@/components/ui/error-message'
import { useToast } from '@/components/ui/use-toast'

export default function Basics({ params }: { params: { formId: string } }) {
  const { toast } = useToast()
  const formDetailsQuery = trpc.form.findById.useQuery(params.formId)
  const updateFormMutation = trpc.form.update.useMutation({
    onSuccess: () => {
      toast({ title: 'Success', description: 'Form updated successfully!', variant: 'success' })
    },
  })

  const form = useForm<UpdateFormInput>({
    resolver: zodResolver(updateFormInput),
    defaultValues: {
      id: params.formId,
    },
  })

  useEffect(
    function updateInitialValues() {
      if (formDetailsQuery.status === 'success') {
        form.reset({
          id: params.formId,
          name: formDetailsQuery.data.name,
          description: formDetailsQuery.data.description,
        })
      }
    },
    [form, formDetailsQuery?.data?.description, formDetailsQuery?.data?.name, formDetailsQuery?.status, params.formId],
  )

  const onSubmit = (values: UpdateFormInput) => {
    updateFormMutation.mutate(values)
  }

  return match(formDetailsQuery)
    .returnType<React.ReactNode>()
    .with({ status: 'loading' }, () => <Loading title="Loading form details..." />)
    .with({ status: 'error' }, () => <ErrorMessage description="Something went wrong while fetching form details" />)
    .with({ status: 'success' }, () => (
      <div className="space-y-4 p-4">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary">
            <SettingsIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold uppercase">Form Settings</h1>
            <p className="text-sm text-muted-foreground">Customize form properties</p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={updateFormMutation.isLoading} placeholder="Enter your form name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={updateFormMutation.isLoading}
                      placeholder="Describe about your form"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" loading={updateFormMutation.isLoading}>
              Update
            </Button>
          </form>
        </Form>
      </div>
    ))
    .exhaustive()
}
