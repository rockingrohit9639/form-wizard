import { z } from 'zod'

export const createFormSchema = z.object({
  name: z.string().min(1, 'Form name is required!').max(50, 'Please enter at most 50 characters'),
  description: z
    .string()
    .min(5, 'Please enter at least 5 characters')
    .max(5000, 'Please enter at most 5000 characters!'),
})

export type CreateFormSchema = z.infer<typeof createFormSchema>
