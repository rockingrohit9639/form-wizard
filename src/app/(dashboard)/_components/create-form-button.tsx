'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FilePlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { CreateFormSchema, createFormSchema } from '@/schema/form'
import { createForm } from '@/actions/form'

export default function CreateFormButton() {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<CreateFormSchema>({
    resolver: zodResolver(createFormSchema),
  })

  const onSubmit = async (values: CreateFormSchema) => {
    try {
      const form = await createForm(values)
      toast({ title: 'Form Created', description: 'Form created successfully!', variant: 'success' })
      router.push(`/builder/${form.id}`)
    } catch (error) {
      toast({ title: 'Error', description: 'Something went wrong, please try again later.', variant: 'destructive' })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-primary/20 hover:border-primary group flex h-48 flex-col items-center justify-center gap-4 border border-dashed hover:cursor-pointer"
        >
          <FilePlusIcon className="text-muted-foreground group-hover:text-primary h-8 w-8" />
          <p className="text-muted-foreground group-hover:text-primary text-xl font-medium">Create new form</p>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle />
          <DialogDescription>Create a new form to start collecting responses</DialogDescription>
        </DialogHeader>

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

            <DialogFooter>
              <Button
                disabled={form.formState.isSubmitting || !form.formState.isValid}
                className="mt-4 w-full"
                type="submit"
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
