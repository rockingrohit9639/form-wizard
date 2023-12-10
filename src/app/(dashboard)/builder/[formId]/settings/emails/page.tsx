'use client'

import { MailIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CreateOrUpdateEmailInput, createOrUpdateEmailInput } from '@/server/api/emails/emails.input'
import TinyEditor from '@/components/tiny-editor'
import { EMAIL_INITIAL_VALUE } from '@/lib/email'
import { trpc } from '@/lib/trpc/client'
import { useToast } from '@/components/ui/use-toast'

export default function Emails({ params }: { params: { formId: string } }) {
  const { toast } = useToast()
  const form = useForm<CreateOrUpdateEmailInput>({
    resolver: zodResolver(createOrUpdateEmailInput),
    defaultValues: {
      formId: params.formId,
    },
  })

  const emailQuery = trpc.emails.findByFormId.useQuery(params.formId)
  const createOrUpdateEmailMutation = trpc.emails.createOrUpdate.useMutation({
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Email updated successfully!',
        variant: 'success',
      })
    },
  })

  const onSubmit = (values: CreateOrUpdateEmailInput) => {
    createOrUpdateEmailMutation.mutate(values)
  }

  useEffect(
    function updateInitialValues() {
      if (emailQuery.status === 'success') {
        form.reset({ formId: params.formId, subject: emailQuery.data?.subject, content: emailQuery.data?.content })
      }
    },
    [emailQuery.data?.content, emailQuery.data?.subject, emailQuery.status, form, params.formId],
  )

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary">
          <MailIcon className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-lg font-bold uppercase">Emails</h1>
          <p className="text-sm text-muted-foreground">Receive an email when someone fills out your form</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input placeholder="Enter subject for your email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <TinyEditor initialValue={EMAIL_INITIAL_VALUE} value={field.value} onEditorChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" loading={createOrUpdateEmailMutation.isLoading}>
            Save
          </Button>
        </form>
      </Form>
    </div>
  )
}
