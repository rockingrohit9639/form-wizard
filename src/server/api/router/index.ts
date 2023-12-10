import { emailRouter } from '../emails/emails.router'
import { formRouter } from '../form/form.router'
import { router } from '../trpc'

export const appRouter = router({
  form: formRouter,
  emails: emailRouter,
})

export type AppRouter = typeof appRouter
