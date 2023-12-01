import { publicProcedure, router } from '../trpc'

export const appRouter = router({
  test: publicProcedure.query(() => ({ message: 'Ok' })),
})

export type AppRouter = typeof appRouter
