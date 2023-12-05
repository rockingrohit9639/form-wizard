import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'
import { createFormInput, updateFormInput } from './form.input'
import {
  createForm,
  findFormById,
  findUserForms,
  getFormWithSubmissions,
  getFormsStats,
  updateForm,
} from './form.service'

export const formRouter = router({
  stats: protectedProcedure.query(({ ctx }) => getFormsStats(ctx.user)),
  findById: protectedProcedure.input(z.string()).query(({ input }) => findFormById(input)),
  update: protectedProcedure.input(updateFormInput).mutation(({ input, ctx }) => updateForm(input, ctx.user)),
  findUserForms: protectedProcedure.query(({ ctx }) => findUserForms(ctx.user)),
  createForm: protectedProcedure.input(createFormInput).mutation(({ input, ctx }) => createForm(input, ctx.user)),
  getFormWithSubmissions: protectedProcedure
    .input(z.string())
    .query(({ input, ctx }) => getFormWithSubmissions(input, ctx.user)),
})
