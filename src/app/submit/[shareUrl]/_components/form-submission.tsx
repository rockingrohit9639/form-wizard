'use client'

import { MousePointerClickIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { generateFieldsValidationSchema, getItemsFromFields } from '@/lib/form'
import { FieldInstance } from '@/types/form'
import { Form } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import { submitForm } from '@/actions/form'
import ItemsRenderer from '@/components/items-renderer'

type FormSubmissionProps = {
  fields: FieldInstance[]
  shareUrl: string
}

type SubmissionSchema = Record<string, unknown>

export default function FormSubmission({ fields, shareUrl }: FormSubmissionProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const validationSchema = generateFieldsValidationSchema(fields)
  const form = useForm<SubmissionSchema>({
    resolver: zodResolver(validationSchema),
  })

  const handleSubmit = async (values: SubmissionSchema) => {
    try {
      setLoading(true)
      const stringifiedValues = JSON.stringify(values)
      await submitForm(shareUrl, stringifiedValues)
      toast({
        title: 'Success',
        description: 'Your submission has been recorded successfully!',
        variant: 'success',
      })
      setSubmitted(true)
    } catch {
      toast({ title: 'Error', description: 'Something went wrong', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

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

  const items = getItemsFromFields(fields)

  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <Form {...form}>
        <form
          className="flex w-full max-w-screen-md flex-col gap-4 border p-8 shadow-lg shadow-primary"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <ItemsRenderer control={form.control} items={items} />

          <Button type="submit" disabled={loading}>
            <MousePointerClickIcon className="mr-2 h-4 w-4" />
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
