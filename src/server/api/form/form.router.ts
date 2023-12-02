import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'
import { updateFormInput } from './form.input'
import { findFormById, findUserForms, getFormsStats, updateForm } from './form.service'

export const formRouter = router({
  stats: protectedProcedure.query(({ ctx }) => getFormsStats(ctx.user)),
  findById: protectedProcedure.input(z.string()).query(({ input }) => findFormById(input)),
  update: protectedProcedure.input(updateFormInput).mutation(({ input, ctx }) => updateForm(input, ctx.user)),
  findUserForms: protectedProcedure.query(({ ctx }) => findUserForms(ctx.user)),
})
