'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SettingsIcon } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { UpdateFormSchema, updateFormSchema } from '@/schema/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function Basics() {
  const form = useForm<UpdateFormSchema>({
    resolver: zodResolver(updateFormSchema),
  })

  const onSubmit = (values: UpdateFormSchema) => {
    console.log(values)
  }

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary">
          <SettingsIcon className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-lg font-bold uppercase">Form Settings</h1>
          <p className="text-sm text-muted-foreground">Customize form properties</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your form name" {...field} />
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
                  <Textarea placeholder="Describe about your form" rows={5} {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button disabled={form.formState.isSubmitting || !form.formState.isValid} className="mt-4" type="submit">
            Update
          </Button>
        </form>
      </Form>
    </div>
  )
}
