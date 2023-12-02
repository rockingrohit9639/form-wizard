import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'
import { updateFormInput } from './form.input'
import { findFormById, updateForm } from './form.service'

export const formRouter = router({
  findById: protectedProcedure.input(z.string()).query(({ input }) => findFormById(input)),
  update: protectedProcedure.input(updateFormInput).mutation(({ input, ctx }) => updateForm(input, ctx.user)),
})
