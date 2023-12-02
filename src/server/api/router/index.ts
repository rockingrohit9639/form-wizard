import { formRouter } from '../form/form.router'
import { router } from '../trpc'

export const appRouter = router({
  form: formRouter,
})

export type AppRouter = typeof appRouter
