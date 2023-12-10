import { z } from 'zod'

export const createOrUpdateEmailInput = z.object({
  subject: z.string(),
  content: z.string(),
  formId: z.string(),
})
export type CreateOrUpdateEmailInput = z.infer<typeof createOrUpdateEmailInput>
