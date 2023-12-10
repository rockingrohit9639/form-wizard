import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'
import { createOrUpdateEmail, findEmailByFormId } from './emails.service'
import { createOrUpdateEmailInput } from './emails.input'

export const emailRouter = router({
  findByFormId: protectedProcedure.input(z.string()).query(({ input }) => findEmailByFormId(input)),
  createOrUpdate: protectedProcedure
    .input(createOrUpdateEmailInput)
    .mutation(({ input, ctx }) => createOrUpdateEmail(input, ctx.user)),
})
