import { z } from 'zod'

export const createFormInput = z.object({
  name: z.string().min(1, 'Form name is required!').max(50, 'Please enter at most 50 characters'),
  description: z
    .string()
    .min(5, 'Please enter at least 5 characters')
    .max(5000, 'Please enter at most 5000 characters!'),
})

export type CreateFormInput = z.infer<typeof createFormInput>

export const updateFormInput = createFormInput.extend({
  id: z.string(),
})
export type UpdateFormInput = z.infer<typeof updateFormInput>

export const updateFormFieldsInput = z.object({
  id: z.string(),
  fields: z.string(),
})
export type UpdateFormFieldsInput = z.infer<typeof updateFormFieldsInput>
